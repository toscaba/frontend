describe('EateryComponent E2E Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });


    it('should apply a filter when a chip is clicked', () => {
        cy.get('mat-chip-option').first().click();
        cy.get('mat-chip-option').first().should('have.class', 'mat-mdc-chip-selected');
      });


  it('should log in and make a reservation', () => {
    // Prüfen, ob der Server verfügbar ist
    cy.get('div').then(($div) => {
      if ($div.text().includes('Server is unavailable')) {
        cy.log('Server is down, skipping test');
        return;
      }
    });

    // Navigiere zur Login-Seite
    cy.get('.button.fancy-button').contains('Login').click();

    // Gib die Login-Daten ein und bestätige
    cy.get('input[name="username"]').type('ullrich-A');
    cy.get('input[name="password"]').type('p455w0rd');
    cy.get('button[type="submit"]').click();

    // Nach dem Login zurück zur Hauptseite navigieren
    cy.get('.top-bar-link').click();

    // Wähle das erste Restaurant und mache eine Reservierung
    cy.get('.eatery').first().within(() => {
      cy.get('.standard-button').contains('Make reservation').click();
    });

        // Warte auf das Laden der Reservierungsseite
    cy.get('h1').should('contain', 'Reserve a table');

    // Anzahl der Gäste eingeben
    cy.get('input[placeholder="2"]').type('4', { force: true });


    // Öffne den Datepicker
    cy.get('mat-datepicker-toggle').click();

    // Wähle den 31. März aus
    cy.get('.mat-calendar-body-cell-content').contains('31').click();


    cy.get('input.mat-timepicker-input').click({ force: true })
    .clear()
    .type('2:00 PM{enter}');
  

    // Reservierung absenden
    cy.get('button.standard-button').contains('Reserve').click({ force: true });

  });

});
