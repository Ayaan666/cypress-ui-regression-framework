import LoginPage from "../../../pages/login.page";
import LeavePage from "../../../pages/leave.page";

describe("Leave Request Flow", () => {
  it("should create entitlement, apply leave, and verify in leave list @regression", () => {

    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    const employeeName = "Paul Collings"; // demo employee in OrangeHRM

    // ⭐ Step 1 — Create entitlement (precondition)
    LeavePage.openEntitlements();
    LeavePage.selectEmployeeForEntitlement(employeeName);
    LeavePage.selectLeaveTypeForEntitlement();
    LeavePage.enterEntitlementDays("5");
    LeavePage.saveEntitlement();

    // ⭐ Step 2 — Apply leave
    LeavePage.openLeaveModule();
    LeavePage.clickApplyLeave();
    LeavePage.selectLeaveType();

    const today = new Date();
    today.setDate(today.getDate() + 5);
    const date = today.toISOString().split("T")[0];

    LeavePage.pickFromDate(date);
    LeavePage.pickToDate(date);

    LeavePage.submitLeave();
    LeavePage.verifyLeaveSuccess();

    // ⭐ Step 3 — Verify in My Leave
    LeavePage.openMyLeaveList();
    LeavePage.verifyLeaveEntry();
  });
});
