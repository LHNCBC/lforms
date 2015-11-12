// Objects on the "Full Featured Form"
var FullFeaturedForm = function() {

  return {
    cneField: element(by.id('/type9/1')),
    src: element(by.id('/slSource1/1')),
    t1: element(by.id('/slTargetItem1/1')),
    t2: element(by.id('/slTargetItem2/1')),
    t4: element(by.id('/slTargetHeader1/slTargetSubItem1/1/1')),
    t5: element(by.id('/slTargetHeader1/slTargetSubItem2/1/1')),

    allSrc1: element(by.id('/slALLSource1/1')),
    allSrc2: element(by.id('/slALLSource2/1')),
    allTarget: element(by.id('/slALLTargetItem/1')),
    anySrc1: element(by.id('/slANYSource1/1')),
    anySrc2: element(by.id('/slANYSource2/1')),
    anyTarget: element(by.id('/slANYTargetItem/1')),

    rpSrc2: element(by.id('/rpSource2/1')),
    rpTarget2a: element(by.id('/repeatingSection1/rpTargetItem2/1/1')),
    rpTarget2b: element(by.id('/repeatingSection1/rpTargetItem2/2/1')),
    rpAdd: element(by.id('add-/repeatingSection1/1')),

    formSearch: element(by.css('#s2id_loinc_num1 a')),
    formShow: element(by.css('.btn')).click(),

    /**
     *  Opens the "full featured" form.
     */
    openFullFeaturedForm: function() {
      browser.get('http://0.0.0.0:9001/');
      this.formSearch.click();
      $('.select2-result:nth-of-type(5)').click();
      this.formShow.click();
    }

  }

}

module.exports = FullFeaturedForm();
