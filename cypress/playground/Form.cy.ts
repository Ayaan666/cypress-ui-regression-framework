import { get } from "node_modules/cypress/types/lodash/index";

describe("New form full info", () => {

    it("should fill the form", () => {

        cy.visit("https://testautomationpractice.blogspot.com/");

        cy.get("#name").type("Ayaan");
        cy.get("#email").type("siddiquiayaan646@gmail.com");
         cy.get("#phone").type("7895465123");
          cy.get("#textarea").type("House no 55, 480555");
          cy.get("#male").check();
          cy.get("#friday").check();
          cy.get("#country").select("Japan");
          cy.get('#colors')
  .scrollTo('bottom')
  .contains('White')
  .click();

    // Open calendar
    cy.get('#datepicker').click();

    cy.get('.ui-datepicker-calendar').find("a[data-date='6']").click();

    cy.get('#singleFileInput').selectFile('cypress/fixtures/AyaanAliQAE.pdf');

    cy.get("table[name='BookTable']").contains("td","Master In Selenium").parent()
  .within(() => {
    cy.get('td').eq(3).should('contain', '3000');

      });
    })
})
