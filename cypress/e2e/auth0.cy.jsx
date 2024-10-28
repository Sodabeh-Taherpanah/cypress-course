// cypress/e2e/auth0-login.cy.js

describe("Auth0 Programmatic Login", () => {
  const domain = "dev-yeuyw0p21jwy8uv8.us.auth0.com"; // e.g., 'dev-abc123.us.auth0.com'
  const clientId = "zSBw7ALETqkktZJ81Gt0ZoXQWOrGyCfP";
  const audience = "https://dev-yeuyw0p21jwy8uv8.us.auth0.com/api/v2/"; // Your Auth0 API identifier

  // Function to programmatically log in
  const login = () => {
    cy.request({
      method: "POST",
      url: `https://${domain}/oauth/token`,
      body: {
        grant_type: "password",
        username: "sudytaher@gmail.com", // Test user credentials
        password: "Sina515380",
        audience: audience,
        client_id: clientId,
        scope: "openid profile email",
      },
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      // Store the token in localStorage as your app does
      const { access_token, id_token } = response.body;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("idToken", id_token);
    });
  };

  it("Should successfully log in and visit protected page", () => {
    // Programmatically log in
    login();

    // After login, visit a protected route
    cy.visit("/dashboard");

    // Assert the protected page is loaded
    cy.contains("Welcome, Test User").should("be.visible");
  });
});
