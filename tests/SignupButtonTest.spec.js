// AGENT_DESCRIPTION
// There should be a button that navigates to the signup page when clicked
// After clicking the button, the URL should be '/signup'
describe('SignupButtonTest', () => {
    const TestName = 'SignupButtonTest';
      it('should navigate to the signup page when clicking the signup link', () => {
        // Visit initial page
        cy.visit('http://localhost:8080');
        cy.document().then(doc => {
          //await document to be fully loaded
          cy.wait(5000);
          const html = doc.documentElement.outerHTML;
          cy.writeFile(`cypress/fixtures/${TestName}.html`, html);
          });
        
        // Click on the signup button
        cy.get('.signup-link').click();
        
        // Check if the URL is correct
        cy.document().then(doc => {
          const html = doc.documentElement.outerHTML;
          cy.writeFile(`cypress/fixtures/${TestName}.html`, html);
          });
        cy.url().should('include', '/sinup');
      });
    });
    