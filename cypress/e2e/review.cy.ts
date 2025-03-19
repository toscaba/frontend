describe('EateryComponent E2E Test', () => {
    beforeEach(() => {
      // Besuch der Startseite
      cy.visit('http://localhost:4200');
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
        cy.get('.standard-button').contains('Write a review').click();
      });

      // Überprüfe, ob das Formular angezeigt wird
      cy.get('div').should('contain', 'Give your review for');
      
      // Überprüfe das Textfeld für die Nachricht (Kommentar)
      cy.get('textarea[matInput]')
        .should('have.attr', 'placeholder', 'What do you think about the place?')
        .should('be.visible');
      
      // Überprüfe das Dropdown-Menü für die Bewertung
      cy.get('mat-select[name="rating"]').should('be.visible');

      // Gebe einen Kommentar ein
      cy.get('textarea[matInput]').type('This is a great place!');
      
      // Wähle eine Bewertung aus
      cy.get('mat-select[name="rating"]').click();
      cy.get('mat-option').contains('5').click();
      
      // Klicke auf den Submit-Button
      cy.get('button.standard-button').click();

        // Besuch der Startseite
        cy.visit('http://localhost:4200');
  
    });
  
  });
  