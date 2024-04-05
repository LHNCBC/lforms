// A module for Observation-based pre-population.


/**
 *  Starts the (likely asynchronous) requests to retrieve linked Observation
 *  resources for pre-population.  When the resources have been retrieved,
 *  prepoluation will be performed.
 * @param lfData the LFormsData object for the form being prepopulated.
 * @return a promise resolving after the resources have been retrieved and
 *  any prepopulation has been performed.
 */
export function requestLinkedObs(lfData) {
  if (LForms.fhirContext?.client && lfData._fhir) {
    // We will need to know what version of FHIR the server is using.  Make
    // sure that is available before continuing.
    if (!LForms._serverFHIRReleaseID) {
      // Go fetch the server's FHIR version first before continuing
      return new Promise(function(resolve, reject) {
        LForms.Util.getServerFHIRReleaseID(function(relID) {
          if (!relID)
            reject("Unable to obtain the server's FHIR version");
          else
            resolve(requestLinkedObs(lfData));
        });
      });
    }
    else {
      var pendingPromises = [];
      LForms.Util.validateFHIRVersion(LForms._serverFHIRReleaseID);
      var serverFHIR = LForms.FHIR[LForms._serverFHIRReleaseID];
      let obsLinkURI = lfData._fhir.SDC.fhirExtObsLinkPeriod;
      for (var i=0, len=lfData.itemList.length; i<len; ++i) {
        let item = lfData.itemList[i];
        const obsExt = item._fhirExt && item._fhirExt[obsLinkURI];
        if (obsExt) { // an array of at least 1 if present
          var duration = obsExt[0].valueDuration; // optional
          var fhirClient = LForms.fhirContext.client;

          // Get a comma separated list of codes
          const codeQuery = item.codeList.map((code) => {
            const codeSystem = code.system === 'LOINC' ? serverFHIR.LOINC_URI : code.system;
            return [codeSystem, code.code].join('|');
          }).join(',');

          const queryParams = {
            code: codeQuery, _sort: '-date',
            status: 'final,amended,corrected',
            _count: 5  // only need one, but we need to filter out focus=true below
          };
          // Temporarily disabling the addition of the focus search
          // parameter, because of support issues.  Instead, for now, we
          // will check the focus parameter when the Observation is
          // returned.  Later, we might query the server to find out whether
          // :missing is supported.
          //if (LForms._serverFHIRReleaseID != 'STU3') // STU3 does not know about "focus"
          //  queryParams.focus = {$missing: true}; // TBD -- sometimes :missing is not supported

          // Constrain the date range
          if (duration && duration.value && duration.code) {
            // Convert value to milliseconds
            var result = LForms.ucumPkg.UcumLhcUtils.getInstance().convertUnitTo(duration.code, duration.value, 'ms');
            if (result.status === 'succeeded') {
              var date = new Date(new Date() - result.toVal);
              queryParams.date = 'gt'+date.toISOString();
            }
          }
          pendingPromises.push(
            fhirClient.patient.request(lfData._buildURL(['Observation'],
              queryParams)
            ).then(function(successData) {
              var bundle = successData;
              if (bundle.entry) {
                var foundObs;
                for (var j=0, jLen=bundle.entry.length; j<jLen && !foundObs; ++j) {
                  var obs = bundle.entry[j].resource;
                  if (!obs.focus) { // in case we couldn't use focus:missing above
                    serverFHIR.SDC.importObsValue(item, obs);
                    if (item.value) { // obs.value[x] could be missing
                      foundObs = true;
                      if (item.unit)
                        lfData._setUnitDisplay(item.unit);
                    }
                  }
                }
              }
              return item.questionCode; // code is not needed, but useful for debugging
            })
          );
        }
      }
      return Promise.all(pendingPromises);
    }
  }
};



