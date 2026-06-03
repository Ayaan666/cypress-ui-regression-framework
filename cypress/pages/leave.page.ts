class LeavePage {

  openLeaveModule() {
    cy.contains("span", "Leave").click();
  }

  // ===============================
  // CREATE LEAVE ENTITLEMENT
  // ===============================

openEntitlements() {

  cy.contains(".oxd-topbar-body-nav-tab-item", "Entitlements")
    .should("be.visible")
    .click();

  cy.contains("a", "Add Entitlements", { timeout: 10000 })
    .should("be.visible")
    .click();
}
selectEmployee(employeeName: string) {

  cy.intercept("GET", "**/api/v2/pim/employees*").as("employeeSearch");

  cy.get('input[placeholder="Type for hints..."]')
    .first()
    .clear()
    .type(employeeName.substring(0,4), { delay: 120 });

  cy.wait("@employeeSearch");

  cy.get(".oxd-autocomplete-dropdown", { timeout: 15000 })
    .should("be.visible");

  cy.get(".oxd-autocomplete-option")
    .should("have.length.greaterThan", 0)
    .first()
    .click();
}

selectLeaveTypeForEntitlement(option: string) {

  cy.contains("label", "Leave Type")
    .parents(".oxd-input-group")
    .find(".oxd-select-text")
    .click();

  cy.get(".oxd-select-dropdown")
    .should("be.visible")
    .within(() => {
      cy.contains(".oxd-select-option", option).click();
    });

  cy.contains("label", "Leave Type")
    .parents(".oxd-input-group")
    .find(".oxd-select-text")
    .should("contain", option);
}
  enterEntitlementDays(days: string) {

    cy.get('input.oxd-input')
      .last()
      .clear()
      .type(days);
  }

  saveEntitlement() {

  cy.contains("button", "Save")
    .should("be.enabled")
    .click();

  // handle entitlement confirmation popup
  cy.contains("button", "Confirm", { timeout: 15000 })
    .should("be.visible")
    .click();

  // verify success toast
  cy.get(".oxd-toast", { timeout: 15000 })
    .should("be.visible")
    .and("contain", "Success");
}

  // ===============================
  // APPLY LEAVE
  // ===============================

  openApplyLeave() {

    cy.contains("a", "Apply")
      .click();

    cy.url()
      .should("include", "applyLeave");
  }

 selectLeaveType(option: string) {

  cy.intercept("GET", "**/leave/leave-types/eligible*").as("leaveTypes");

  cy.wait("@leaveTypes");

  // guard condition
  cy.get("body").then(($body) => {
    if ($body.text().includes("No Leave Types with Leave Balance")) {
      throw new Error("❌ No leave balance available for this user");
    }
  });

  cy.contains("label", "Leave Type")
    .parents(".oxd-input-group")
    .find(".oxd-select-text")
    .click();

  cy.get(".oxd-select-dropdown")
    .should("be.visible")
    .within(() => {
      cy.contains(".oxd-select-option", option).click();
    });

  cy.contains(".oxd-select-text")
    .should("contain", option);
}
  setFromDate(date: string) {

    cy.contains("label", "From Date")
      .parents(".oxd-input-group")
      .find("input")
      .clear()
      .type(`${date}{enter}`);
  }

  setToDate(date: string) {

    cy.contains("label", "To Date")
      .parents(".oxd-input-group")
      .find("input")
      .clear()
      .type(`${date}{enter}`);
  }

  submitLeave() {

  cy.contains("button", "Apply")
    .should("be.visible")
    .click();

  cy.get(".oxd-toast", { timeout: 15000 })
    .should("be.visible")
    .and("contain", "Success");
}

  // ===============================
  // VERIFY LEAVE
  // ===============================

  openMyLeave() {

    cy.contains("a", "My Leave")
      .click();
  }

  verifyLeaveEntry() {

    cy.get(".oxd-table-body", { timeout: 15000 })
      .should("be.visible");
  }

}

export default new LeavePage();