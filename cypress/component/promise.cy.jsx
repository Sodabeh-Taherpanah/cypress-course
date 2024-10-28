// You can wrap promises returned by the application code. Cypress commands will automatically wait for the promise to resolve before continuing with the yielded value to the next command or assertion.

const myPromise = new Promise((resolve, reject) => {
  // we use setTimeout(...) to simulate async code.
  setTimeout(() => {
    resolve({
      type: "success",
      message: "It worked!",
    });
  }, 2500);
});

it("should wait for promises to resolve", () => {
  cy.wrap(myPromise).its("message").should("eq", "It worked!");
});
