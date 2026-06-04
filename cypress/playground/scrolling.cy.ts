describe("New scrolling drop down", () => {

    it("should handle the scrolling dropdown", () => {
   
        cy.visit("https://testautomationpractice.blogspot.com/");
        cy.get("#comboBox").click();
        cy.get("#dropdown").contains("Item ").click();
    

    })
})