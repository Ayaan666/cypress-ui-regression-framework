describe("dblclick", () => {

    it("dblclick the button", () => {

        cy.visit("https://testautomationpractice.blogspot.com/");

        cy.get("button[ondblclick='myFunction1()']").dblclick();
         
    })
})