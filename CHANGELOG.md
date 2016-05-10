# Change log

This project follows [Semantic Versioning](http://semver.org/).

## [6.0.2]   2016-05-10
### Fixed
- Turned in "minification" of the distribution version of the JavaScript.

## [6.0.1]   2016-05-04
### Fixed
- Updated Protractor to work with new version of Firefox, and updated some
  tests to work with the new Protractor.

## [6.0.0]   2016-04-21
### New
- A getFormData function to get complete form definition data, including
  user input data.
- Events are emitted when a repeating item or section is added or removed.
  
### Changed
- The existing getFormData function is renamed to getUserData.

## [5.7.0]   2016-04-19
### New
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

