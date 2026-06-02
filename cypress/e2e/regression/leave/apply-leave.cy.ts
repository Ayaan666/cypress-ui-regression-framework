import LoginPage from "../../../pages/login.page"
import LeavePage from "../../../pages/leave.page"


describe("Leave Management Flow", () => {

  it("should create entitlement and apply leave successfully @regression", () => {

    LoginPage.visit()

    LoginPage.login("Admin", "admin123")

    LeavePage.openLeaveModule()

    // Step 1: Create entitlement
    LeavePage.openEntitlements()

    LeavePage.selectEmployee("Manda")

    LeavePage.selectLeaveTypeForEntitlement()

    LeavePage.enterEntitlementDays("5")

    LeavePage.saveEntitlement()

    // Step 2: Apply leave
    LeavePage.openApplyLeave()

    LeavePage.selectLeaveType()

    LeavePage.setFromDate("2026-06-10")

    LeavePage.setToDate("2026-06-12")

    LeavePage.submitLeave()

    // Step 3: Verify leave
    LeavePage.openMyLeave()

    LeavePage.verifyLeaveEntry()

  })

})