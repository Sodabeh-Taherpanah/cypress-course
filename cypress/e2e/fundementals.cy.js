describe("Fundamentals spec", () => {
  beforeEach(() => {
    cy.visit("/fundamentals");
  });
  it("fundamentals header", () => {
    // cy.get('[data-test="fundamentals-header"]').contains(
    //   /Testing Fundamentals/i
    // );
    cy.getDataTest("fundamentals-header").should(
      "contain.text",
      "Testing Fundamentals"
    );
  });
  // if we want to only test dome portion of test we can use .  it.only()
  it("fundamental item", () => {
    cy.contains(/within that block/i).should("not.be.visible");
    cy.get('[data-test="according-item-1"] div[role="button"]').click();
    cy.contains(/within that block/i).should("be.visible");
    cy.get('[data-test="according-item-1"] div[role="button"]').click();
    cy.contains(/within that block/i).should("not.be.visible");
  });
});
