describe("test", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("test subscribe form", () => {
    cy.contains(/testing forms/i);
    cy.getDataTest("subscribe-form").find("input").as("subscribe-input"); //
    cy.get("@subscribe-input").type("sudytaher@gmail.com"); //use alias above
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: sudytaher@gmail.com/i).should("exist");
    cy.wait(3000);
    cy.contains(/Successfully subbed: sudytaher@gmail.com/i).should(
      "not.exist"
    );

    cy.get("@subscribe-input").type("sudytaher@gmail.cm"); //use alias above
    cy.getDataTest("subscribe-button").click();
    cy.contains(/Successfully subbed: sudytaher@gmail.com/i).should(
      "not.exist"
    );
  });
});
