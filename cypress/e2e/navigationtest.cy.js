// cypress/e2e/navigation.cy.js
describe('Navigation', () => {
  it('should navigate to the home page', () => {
    cy.visit('http://localhost:5500'); // Replace with your local server URL
    cy.contains('VoteLehan').click();
    cy.url().should('include', '/index.html');
  });

  it('should navigate to the about page', () => {
    cy.visit('http://localhost:5500/policy.html');
    cy.contains('Policy').click();
    cy.url().should('include', '/policy.html');
  });
});
