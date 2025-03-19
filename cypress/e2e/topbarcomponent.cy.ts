describe('Top Bar Navigation', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display the top bar with Eatery WebApp title', () => {
      cy.get('.top-bar-link h1').should('contain', 'Eatery WebApp');
    });
  
    it('should show login button when user is not logged in', () => {
      cy.get('.button.fancy-button').contains('Login').should('be.visible');
    });
  });
  