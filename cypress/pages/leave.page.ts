class LeavePage {

  openLeaveModule() {
    cy.contains("span", "Leave").click();
  }

  // ⭐ NEW — entitlement navigation
openEntitlements() {
  // open Leave module
  cy.contains("span", "Leave").click();

  // open Entitlements dropdown (structure-safe)
  cy.contains("button, span, a", "Entitlements", { timeout: 15000 })
    .should("be.visible")
    .click();

  // click "Add Entitlements" from dropdown
  cy.contains("a, span", "Add Entitlements", { timeout: 15000 })
    .should("be.visible")
    .click();

  // confirm navigation reached Add Entitlement page
  cy.url({ timeout: 15000 }).should("include", "addLeaveEntitlement");
}


  selectEmployeeForEntitlement(employeeName: string) {
    cy.get('input[placeholder="Type for hints..."]')
      .first()
      .type(employeeName);

    cy.contains(".oxd-autocomplete-option", employeeName, { timeout: 10000 })
      .click();
  }

  selectLeaveTypeForEntitlement() {
    cy.get(".oxd-select-text").first().click();
    cy.get(".oxd-select-option").first().click();
  }

  enterEntitlementDays(days: string) {
    cy.get('input.oxd-input').last().clear().type(days);
  }

  saveEntitlement() {
    cy.contains("button", "Save").click();
    cy.get("body", { timeout: 10000 }).should("contain.text", "Successfully");
  }

  // ⭐ APPLY LEAVE FLOW
  clickApplyLeave() {
    cy.contains("a", "Apply").click({ force: true });
    cy.url({ timeout: 15000 }).should("include", "/leave/applyLeave");
  }

  selectLeaveType() {
    cy.get(".oxd-select-text").first().click({ force: true });
    cy.get(".oxd-select-option").first().click({ force: true });
  }

  pickFromDate(date: string) {
    cy.contains("label", "From Date")
      .parents(".oxd-input-group")
      .find("input")
      .click({ force: true })
      .type(`{selectall}${date}{enter}`, { force: true });
  }

  pickToDate(date: string) {
    cy.contains("label", "To Date")
      .parents(".oxd-input-group")
      .find("input")
      .click({ force: true })
      .type(`{selectall}${date}{enter}`, { force: true });
  }

  submitLeave() {
    cy.contains("button", "Apply", { timeout: 15000 })
      .should("be.visible")
      .and("not.be.disabled")
      .then(($btn) => cy.wrap($btn).click());

    cy.get("body", { timeout: 15000 }).should("contain.text", "Successfully");
  }

  verifyLeaveSuccess() {
    cy.get("body", { timeout: 15000 }).should("contain.text", "Successfully");
  }

  openMyLeaveList() {
    cy.contains("a", "My Leave").click();
  }

  verifyLeaveEntry() {
    cy.get(".oxd-table-body", { timeout: 15000 }).should("exist");
  }
}

export default new LeavePage();   // ⭐ MUST be instance
