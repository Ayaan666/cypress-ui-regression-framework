class LeavePage {

  openLeaveModule() {
    cy.contains("span", "Leave").click();
  }

  // ===============================
  // CREATE LEAVE ENTITLEMENT
  // ===============================

  openEntitlements() {

    cy.contains("span", "Entitlements").click();

    cy.contains("a", "Add Entitlements")
      .click();

    cy.url()
      .should("include", "addLeaveEntitlement");
  }

  selectEmployee(employeeName: string) {

    cy.intercept("GET", "**/api/v2/pim/employees*")
      .as("employeeSearch");

    cy.get('input[placeholder="Type for hints..."]')
      .first()
      .clear()
      .type(employeeName, { delay: 120 });

    cy.wait("@employeeSearch");

    cy.get(".oxd-autocomplete-option", { timeout: 15000 })
      .should("be.visible")
      .first()
      .click();
  }

selectLeaveTypeForEntitlement() {

  // open dropdown
  cy.contains("label", "Leave Type")
    .parents(".oxd-input-group")
    .find(".oxd-select-text")
    .click();

  // wait for dropdown to render
  cy.get(".oxd-select-dropdown", { timeout: 15000 })
    .should("be.visible");

  // select option using contains
  cy.contains(".oxd-select-option", "CAN")
    .click({ force: true });

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

  selectLeaveType() {

    cy.contains("label", "Leave Type")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();

    cy.get(".oxd-select-dropdown")
      .should("be.visible");

    cy.get(".oxd-select-option")
      .eq(1)
      .click();
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

    cy.get(".oxd-toast")
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