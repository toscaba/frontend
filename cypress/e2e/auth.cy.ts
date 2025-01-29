describe('Login and Registration Tabs', () => {
  
    beforeEach(() => {
      cy.visit('/login') 
    });
  
    it('should show validation errors for empty login fields', () => {
      cy.contains('Login').click(); // Zum Login-Tab wechseln
  
      // Klick in das Benutzername-Feld und wieder raus
      cy.get('input[name="username"]').click().blur();
      cy.contains('Username is required').should('be.visible');
  
      // Klick in das Passwort-Feld und wieder raus
      cy.get('input[name="password"]').click().blur();
      cy.contains('Password is required').should('be.visible');
    });
  
  
    it('should show validation errors for empty registration fields', () => {
      cy.contains('Register').click();
  
      // Klick in das First Name-Feld und wieder raus
      cy.get('input[name="firstname"]').click().blur();
      cy.contains('First name is required').should('be.visible');
  
      // Klick in das Last Name-Feld und wieder raus
      cy.get('input[name="lastname"]').click().blur();
      cy.contains('Last name is required').should('be.visible');
  
      // Klick in das Phone Number-Feld und wieder raus
      cy.get('input[name="phonenumber"]')
      .click({ force: true })  // Erzwingt den Klick trotz Blockierung
      .blur();    

      cy.contains('Phone number is required').should('be.visible');
  
      // Klick in das Email-Feld und wieder raus
      cy.get('input[name="email"]').click().blur();
      cy.contains('Email is required').should('be.visible');
  
    // "Payment method" auswählen
    cy.get('mat-select[name="payment"]').click();  // Dropdown öffnen
    cy.get('mat-option[value="CASH"]').click();   // Eine Auswahl treffen

    cy.get('[data-testid="register-button"]').click();  // "Register"-Button klicken

    // Überprüfe, ob die Fehlermeldung für das Payment angezeigt wird
    cy.contains('Payment method is required').should('not.exist');
     });
})