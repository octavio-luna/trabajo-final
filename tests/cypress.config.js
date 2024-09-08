// cypress.config.js
module.exports = {
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },
      specPattern: './integration_tests.js',
      supportFile: false, 
    },
  };
  