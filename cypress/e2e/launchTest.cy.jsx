describe("Fetch API Button", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Update to your app URL
  });

  it("should fetch and display data when the button is clicked", () => {
    // Intercept the API call and mock response
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/1", {
      statusCode: 200,
      body: {
        userId: 1,
        id: 1,
        title: "Mock Title",
        body: "Mock body content",
      },
    }).as("fetchData");

    // Click the button
    cy.get("button").contains("Fetch Data").click();

    // Wait for API call
    cy.wait("@fetchData");

    // Check if the response is displayed correctly
    cy.get("h2").contains("API Response:");
    cy.get("p").contains("Mock Title");
    cy.get("p").contains("Mock body content");
  });
});
