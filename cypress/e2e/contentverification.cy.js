// cypress/e2e/content.cy.js
describe('Content Verification', () => {
  it('should display the correct title on the home page', () => {
    cy.visit('http://localhost:5500/index.html');
    cy.contains('Vote Lehan'); // Replace with the actual title
  });

  it('should have a specific paragraph in the about page', () => {
    cy.visit('http://localhost:5500/policy.html');
    cy.contains('President.'); // Replace with actual content
  });
});
