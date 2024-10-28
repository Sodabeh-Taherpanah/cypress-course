describe("API Test", () => {
  it("makes a GET request to an API", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then(
      (response) => {
        expect(response.status).to.eq(200); // Check if the status is 200 (OK)
        expect(response.body).to.have.property("id", 1); // Validate the response body
      }
    );
  });

  it("makes a POST request to an API", () => {
    cy.request({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201); // Check for successful creation
      expect(response.body).to.have.property("title", "foo"); // Validate response data
    });
  });
});
