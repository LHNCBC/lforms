## What is LForms?

[LForms](http://lhncbc.github.io/lforms/), a.k.a. LHC-Forms, is a feature-rich,
open-source widget that creates input forms, based on definition files, for
Web-based applications.  In addition to its native form-definition format, it
partially supports the HL7 FHIR Questionnaire standard (SDC profile), and work
is in progress to expand that support.

It is being developed by the Lister Hill National Center for Biomedical
Communications ([LHNCBC](https://lhncbc.nlm.nih.gov)), National Library of
Medicine ([NLM](https://www.nlm.nih.gov)), part of the National Institutes of
Health ([NIH](https://www.nih.gov)), with the collaboration and support from the
[Regenstrief Institute](https://www.regenstrief.org/), Inc. and the
[LOINC](https://loinc.org/) Committee.

For features and demos, please visit the [project
page](http://lhncbc.github.io/lforms/).

## Licensing and Copyright Notice
See [LICENSE.md](LICENSE.md).

## Customizing and Contributing
If you wish to revise this package, the following steps will allow you to make
changs and test them:

* Install Node.js (version 10 is what we are currently using, but it should work with later versions)
* Clone the lforms repository and cd to its directory
* npm ci
* Make sure node_modules/.bin is in your path
* bower install
* npm run build
* npm run start # starts the app we use for testing
* npm run test # runs the tests
* Templates are in app/views; CSS in app/styles

If you are planning to contribute new functionality back to us, please
coordinate with us, so that the new code is in the right places, and so that
you don't accidentally add something that we are also working on.
