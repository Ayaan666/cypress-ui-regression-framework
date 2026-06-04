import { defineConfig } from "cypress";
// @ts-ignore
import mochawesome from "cypress-mochawesome-reporter/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",

    specPattern: [
      "cypress/e2e/smoke/**/*.cy.ts",
      "cypress/e2e/regression/**/*.cy.ts"
    ],

    setupNodeEvents(on, config) {
      mochawesome(on);

      return config;
    }
  },

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Automation Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  screenshotOnRunFailure: true,

  screenshotsFolder: "cypress/screenshots",

  videosFolder: "cypress/videos",

  viewportWidth: 1366,

  viewportHeight: 768,

  defaultCommandTimeout: 10000,

  pageLoadTimeout: 30000,

  retries: {
    runMode: 1,
    openMode: 0
  }
});