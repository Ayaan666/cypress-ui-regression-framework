import LoginPage from "../../pages/login.page";
import PimPage from "../../pages/pim.page";


describe("PIM Employee Search & Edit", () => {
  it("should search and update employee successfully @regression", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    PimPage.openPimModule();

    const uniqueId = Date.now();
    const firstName = `John${uniqueId}`;
    const lastName = "Tester";

    // Create employee first (reuse existing flow)
    PimPage.clickAddEmployee();
    PimPage.enterFirstName(firstName);
    PimPage.enterLastName(lastName);
    PimPage.saveEmployee();
    PimPage.verifyEmployeeCreated(firstName);

    // Search created employee
    PimPage.openPimModule();
    PimPage.searchEmployee(firstName);

    // Open profile & edit
    PimPage.openFirstSearchResult();

    const updatedLastName = "Updated";
    PimPage.editLastName(updatedLastName);
    PimPage.saveChanges();

    // Verify persistence
    PimPage.verifyUpdatedName(updatedLastName);
  });
});
