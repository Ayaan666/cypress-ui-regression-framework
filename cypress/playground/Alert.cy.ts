describe("Alertpop", () => {

  it("should handle the Alertpopup", () => {

    cy.visit("https://testautomationpractice.blogspot.com/");

    
    cy.window().then(function(p){
        cy.stub(p, "prompt").returns("Hello Harry Potter! How are you today?")

        cy.get("#promptBtn").click();
    //     cy.on('window:alert', (text) => {
    //  expect(text).to.contains('You Hello Harry Potter! How are you today? OK!');
    //   return true;

    
    })
})
})