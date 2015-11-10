## What is LForms?

[LForms](https://lhncbc.nlm.nih.gov/project/lforms) is a light-weight,
feature-rich, open-source widget that creates input forms for Web-based medical
applications. It was developed by the Lister Hill National Center for Biomedical
Communications ([LHNCBC](https://lhncbc.nlm.nih.gov)), National Library of
Medicine ([NLM](https://www.nlm.nih.gov)),  part of the National Institutes of
Health ([NIH](https://www.nih.gov)), with the collaboration and support from the
[Regenstrief Institute](https://www.regenstrief.org/), Inc. and the
[LOINC](https://loinc.org/) Committee.

The LForms software is written entirely in JavaScript, using Google’s AngularJS
framework, as well as some widgets developed in-house at NLM. A form is defined
by listing the form questions (e.g. LOINC observations) and incorporating
metadata for each, including: data type, cardinality, default value, units of
measure (if numeric), answer lists (if multiple choice), relationship (in a
hierarchy) to other questions, validation checks, skip logic and help messages.

In LForms, questions can accept multiple answers, and groups of questions or
single questions can repeat. LForms will generate total scores for any set of
questions whose answers have scores (e.g., Glasgow coma score). <a
href="#formdef">Form definitions</a> can be specified as JSON data structures or
CSV files. We have used LForms to generate Web-based forms for many LOINC panels
and for AHRQ Patient Safety Event Reports.  See the [demo
site](https://lforms-demo.nlm.nih.gov) for a working example.

## Installation
LForms installs using the [bower](http://bower.io) package manager, i.e. `bower
install lforms`.

## Usage

### HTML

The HTML in your page will look something like:

    <body ng-app="myApp">
      <div ng-controller="lformsTestControllerH">
        <lforms-panel-h></lforms-panel-h>
      </div>
    </body>

The directive is contained by a controller (in this example named
"lformsTestControllerH") which will have the responsibility of providing the
form definition data (as a JSON object).

### JavaScript

In the JavaScript for the AngularJS app, include 'lformsWidget' as a module to
be loaded. Then, in the JavaScript for the AngularJS controller, construct an
LFormsData object with the JSON [form definition](#formdef) and assign that
object to the scope variable "lfData".  The form should initialize and display.
For example:

    angular.module('myApp', ['lformsWidget'])
      .controller('lformsTestControllerH', ['$scope', function ($scope) {
        $scope.lfData = new LFormsData(myFormDefinition);
      }]);

### Retrieving User-Entered Data

After the user fills out a form, the data they have entered and things like
codes for coded answer lists will be stored in the data model.  To retrieve that
data, LForms provides the following API:

    WidgetUtil.getFormData(formElement, noFormDefData, noEmptyValue, noHiddenItem)

With no arguments (i.e. WidgetUti.getFormData()), the data for the first LForm
found on that page will be returned, and will include the form definition,
along with entries for questions the user left blank and for questions that were
hidden by skip-logic (which the user might not have seen).  This default return
behavior can be changed by the parameters, but in all cases the returned data
will follow the structure of the form, in that answers will be nested inside
containing hashes representing their sections.

The parameters are:
    1. formElement - an HTML element that includes the LForm's rendered form. If
       this is ommitted, the "body" tag will be used.  If there is more than one
       LForm within formElement, the first found will be used.
    2. noFormDefData (optional, default false) - If this is true, the form
       definition data will not be returned along with the data.
    3. noEmptyValue (optional, default false) - If this is true, items that have
       an empty value will be removed.
    4. noHiddenItem (optional, default false) - If this is true, items that are
       hidden by skip logic will be removed.

As an example, here is the data from a partially filled-in vital signs panel,
returned via `WidgetUtil.getFormData(null, true, true, true)`:

```json
    {
      "itemsData": [{
        "questionCode": "35094-2",
        "items": [{
          "questionCode": "8480-6",
          "value": "100",
          "unit": {
            "name": "mm[Hg]",
            "default": false,
            "normalRange": null,
            "absoluteRange": null
          }
        }, {
          "questionCode": "8357-6",
          "value": {
            "label": null,
            "code": "LA24014-5",
            "text": "Oscillometry",
            "other": null
          }
        }]
      }],
      "templateData": [{
        "value": "2015-11-09T05:00:00.000Z"
      }]
    }
```

The first section in the returned data "itemsData" contains all of the data from
the form itself.  LForms (optionally) adds a section to the top of the form that
includes fields like "Date" and "Comment", and the data for these elements shows
up in "templateData".  The form definition data was not included in the above
example, but you can see the structure if you look closely at itemsData.  In
this form, there was a section (question code "35094-2") which contained both of
the two filled-in items as data.  That is why there is just one entry in the
itemsData itself, and that item has two sub-items in "items" array.  One of the
two items was numeric and had an associated unit field, while the other was a
coded list field.

## <a name="formdef"></a>Form Definition Format

Form definitions are stored in a JSON structure.  To get a rough idea of what
these are you can take a look at one of the
[samples](app/scripts/lib/sample-data.js), or for a detailed description see the
[form definition documentation](form_definition.md).

## Licensing and Copyright Notice
The LForms software employs the LOINC data model, including the LOINC table,
LOINC codes, LOINC panels and forms file, which are copyrighted © 1995-2015,
Regenstrief Institute, Inc. and the Logical Observation Identifiers Names and
Codes (LOINC) Committee, and are available at no cost under the license at
http://loinc.org/terms-of-use. LOINC® is a registered United States trademark of
Regenstrief Institute, Inc.

Please cite as: http://lhncbc.nlm.nih.gov/project/lforms

This software is distributed under the license set forth below, which is based
on the BSD open-source license.

No warranty or indemnification for damages resulting from claims brought by
third parties whose proprietary rights may be infringed by your usage of this
software are provided by any of the owners.

### NIH License
Owner Notice: The Owner of this software, LForms, is the National Institutes of
Health/Department of Health and Human Services, Bethesda, MD, U.S.A. All rights
reserved.

The software includes elements owned by Joyent, Inc., TJ Holowaychuk, Google,
Inc., Kit Cambridge, Kristopher Michael Kowal, jQuery Foundation, Twitter, Inc,
The AngularUI Team, and Karsten Sperling, who have distributed them to NIH under
the MIT open-source license.

Redistribution and use in source and binary forms, with or without modification,
are permitted for commercial and non-commercial purposes and products alike,
provided that the following conditions are met:
* Redistributions of source code shall retain the above Owner Notice, this list
of conditions and the following disclaimer.
* Redistributions in binary form shall reproduce the above Owner Notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.
* Neither the names of the National Library of Medicine (NLM), the Lister Hill
National Center for Biomedical Communications (LHNCBC), the National
Institutes of Health (NIH), nor the names of any of the software contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE OWNER AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
OF SUCH DAMAGE.


