// The project root directory is the root for the cypress server
describe('"questionnaire-hidden" extension Test', () => {
  it('should hide all kinds of items that have the questionnnaire-hidden extension', () => {
    // load a lforms form data
    cy.visit('/test/pages/lforms_testpage.html');
    cy.get("#loadBtn").contains("Load From File");
    cy.get('#fileAnchor').uploadFile('test/data/R4/questionnaire-hidden-extension.json');
    cy.get('.lhc-form-title').contains('A questionnaire for testing questionnaire-hidden extension');

    // normal item
    const item = 'label-q1/1';
    cy.byId(item).should('be.visible');

    // hidden item 
    const hiddenItem = 'label-q2/1';
    cy.byId(hiddenItem).should('not.exist');

    // hidden vertical group
    const hiddenVGroup = 'label-g-hidden-vertical-group/1'
    const itemInHiddenVGroup = 'label-g-hidden-vertical-group/q1/1/1'
    cy.byId(hiddenVGroup).should('not.exist');
    cy.byId(itemInHiddenVGroup).should('not.exist');

    // hidden group in a displayed group
    const parentGroup = 'label-g-displayed-vertical-group/1'   //displayed vertical group that contains a hidden group
    const hiddenSubGroup = 'label-g-displayed-vertical-group/g-hidden-vertical-group/1/1'
    const itemInHiddenSubGroup = 'label-g-displayed-vertical-group/g-hidden-vertical-group/q1/1/1/1'
    cy.byId(parentGroup).should('be.visible');
    cy.byId(hiddenSubGroup).should('not.exist');
    cy.byId(itemInHiddenSubGroup).should('not.exist');

    // hidden horizontal group
    const hiddenHGroup = 'label-g-hidden-horizontal-group/1'
    const itemInHiddenHGroup = 'label-g-hidden-horizontal-group/q1/1/1'
    cy.byId(hiddenHGroup).should('not.exist');
    cy.byId(itemInHiddenHGroup).should('not.exist');

    // hidden matrix
    const hiddenMatrix = 'label-g-hidden-matrix/1'
    const itemInHiddenMatrix = 'label-g-hidden-matrix/q1/1/1'
    cy.byId(hiddenMatrix).should('not.exist');
    cy.byId(itemInHiddenMatrix).should('not.exist');

    // hidden column in a horizontal group
    const hgroup = 'label-g-horizontal-group/1'  //horizontal group with a hidden column
    const col1 = 'label-g-horizontal-group/q1/1/1' //a hidden question in a horizontal group
    const input1 = 'g-horizontal-group/q1/1/1'
    const col2 = 'label-g-horizontal-group/q2/1/1' //a displayed question in a horizontal group
    const input2 = 'g-horizontal-group/q2/1/1'
    cy.byId(hgroup).should('be.visible');
    cy.byId(col1).should('not.exist');
    cy.byId(input1).should('not.exist');
    cy.byId(col2).should('be.visible');
    cy.byId(input2).should('be.visible');

    // hidden question row in a matrix
    const mgroup = 'label-g-displayed-matrix/1'  //displayed matrix
    const row1 = 'label-g-displayed-matrix/q1/1/1' //a hidden question in a matrix	
    const radio1 = 'g-displayed-matrix/q1/1/1LA10427-5'
    const row2 = 'label-g-displayed-matrix/q2/1/1' //a displayed question in a matrix
    const radio2 = 'g-displayed-matrix/q2/1/1LA10427-5'
    cy.byId(mgroup).should('be.visible');
    cy.byId(row1).should('not.exist');
    cy.byId(radio1).should('not.exist');
    cy.byId(row2).should('be.visible');
    cy.byId(radio2).should('be.visible');

  });



});