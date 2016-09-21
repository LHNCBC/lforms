# Change log

This project follows [Semantic Versioning](http://semver.org/).

## [7.6.1]   2016-09-21 
### Fixed
- Renamed the CSS class 'empty-question' to 'lf-empty-question' to avoid
  possible confusion.

## [7.6.0]   2016-08-12
### Added
- Added support for setting the code systems for the form and for questions.

## [7.5.0]   2016-08-09
### Added
- Added support for a new data type, NR (numeric range).

## [7.4.1]   2016-08-08 
### Fixed
- Prevented HTML tags in listColHeaders from rendering, to reduce the risk
  of XSS attacks.

## [7.4.0]   2016-08-05
### Added
- Added an option to hide the Units column/field.

## [7.3.0]   2016-08-04 
### Added
- A listColHeaders option for specifying column headers to appear over the lists
  for search fields (lists specified with "externallyDefined").

## [7.2.0]   2016-08-01
### Added
- Added an optional codingInstructionsFormat field on item level to specify 
  the format of coding instructions for each individual item.

### Fixed
- Added a missing polyfill.js file that should have been in 7.1.1.

## [7.1.1]   2016-07-29
### Changed
- Uncoded CWE values rendered as HL7 are now placed into OBX5.9.
- Adjusted formatting of HL7 output to allow the message lines to wrap after a
  repeat. 

## [7.1.0]   2016-07-21
### Added
- The code system of an answer list can now be specified in "answerCodeSystem"
  on individual items in a form definition.

## [7.0.0]   2016-07-13
### Added
- User data validations based on dataType and restrictions

### Changed
- Use a single namespace, LForms, for all LForms functions and objects. 

## [6.1.3]   2016-06-13
### Fixed
- Another CSS fix for IE.  This is a fix for the placeholder text for textareas,
  and should have been fixed as a part of the 6.1.1 changes, but was missed.

## [6.1.2]   2016-06-09
### Fixed
- Updated the autocomplete-lhc dependency (to 9.0.1) to get some fixes.

## [6.1.1]   2016-06-02
### Fixed
- Two CSS fixes for IE.

## [6.1.0]   2016-05-13
### Added
- Added a function to export user data in HL7 segments (in progress).

## [6.0.2]   2016-05-10
### Fixed
- Turned on "minification" of the distribution version of the JavaScript.

## [6.0.1]   2016-05-04
### Fixed
- Updated Protractor to work with new version of Firefox, and updated some
  tests to work with the new Protractor.

## [6.0.0]   2016-04-21
### Added
- A getFormData function to get complete form definition data, including
  user input data.
- Events are emitted when a repeating item or section is added or removed.
  
### Changed
- The existing getFormData function is renamed to getUserData.

## [5.7.0]   2016-04-19
### Added
- A 'list' template.
- A 'matrix' layout for section items, in addition to 'horizontal' and
  'vertical'.
- A attribute 'answerLayout' in the 'displayControl' field for items 
  that have answers.
- A 'displayControl' field in 'templateOptions' at the form level.
  
### Changed
- All existing template names are combined into a new 'table' template
- The existing 'layout' field is renamed as 'questionLayout' and moved 
  into the 'displayControl' field.

## [5.6.1]   2016-04-01
### Changed
- Field hints for search autocompleters were changed to read "Search for... "
  rather than "Select... " because for search autocompleters the user does not
  see a list until the first couple of characters are typed.

## [5.6.0]   2016-03-29
### Removed
- WidgetUtil.preprocessRIData.  This was an internal API, so it should not be
  a breaking change for anyone but ourselves.

