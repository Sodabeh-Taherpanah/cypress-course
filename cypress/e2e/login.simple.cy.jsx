describe("Authentication Test", () => {
  beforeEach(() => {
    // Navigate to the login page before each test
    cy.visit("/login");
  });

  it("Should log in successfully with valid credentials", () => {
    // Fill in the login form
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify if the user is redirected to the dashboard or authenticated page
    cy.url().should("include", "/dashboard");

    // Check if the token or session has been stored (for JWT-based auth)
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.exist;
    });

    // Check if some user-specific content is displayed on the page
    cy.contains("Welcome, Test User").should("be.visible");
  });

  it("Should show error on invalid credentials", () => {
    // Fill in the login form with wrong credentials
    cy.get('input[name="email"]').type("wronguser@example.com");
    cy.get('input[name="password"]').type("wrongpassword");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check if an error message is displayed
    cy.get(".error-message").should("contain", "Invalid credentials");

    // Ensure the URL is still the login page
    cy.url().should("include", "/login");

    ///mock api call with intercept
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 200,
      body: { token: "fake-jwt-token" },
    }).as("loginRequest");
  });
});
