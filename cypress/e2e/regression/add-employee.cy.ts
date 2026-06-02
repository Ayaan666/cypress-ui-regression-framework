import LoginPage from "../../pages/login.page";
import PimPage from "../../pages/pim.page";

describe("PIM Regression Suite", () => {
  it("should add a new employee successfully @regression", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    PimPage.openPimModule();
    PimPage.clickAddEmployee();

    const uniqueId = Date.now();
    const firstName = `John${uniqueId}`;
    const lastName = "Tester";

    PimPage.enterFirstName(firstName);
    PimPage.enterLastName(lastName);
    PimPage.saveEmployee();

    PimPage.verifyEmployeeCreated(firstName);
  });
});
