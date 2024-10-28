import MovieCard from "@/app/components/MovieCard";

const MovieCardMock = {
  id: 123,
  Title: "My Mock Movie",
  Year: 2023,
  Plot: "Cypress does some pretty neat component testing!",
};

describe("<MovieCard/>", () => {
  it("render movie card data", () => {
    cy.mount(<MovieCard movie={MovieCardMock} />);
    cy.get('[data-cy="movie-title"]').should("have.text", MovieCardMock.Title);
    cy.get('[data-cy="movie-plot"]').should("have.text", MovieCardMock.Plot);
  });
});
