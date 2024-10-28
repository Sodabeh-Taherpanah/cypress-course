import React from "react";
import SearchForm from "@/app/components/SearchForm";

describe("<SearchForm />", () => {
  it("submits entered text to listener", () => {
    cy.mount(<SearchForm onSearch={cy.stub().as("onearch")} />);

    cy.get("input").type("my search value");
    cy.get("button").click();

    cy.get("@onearch").should((mock) => {
      expect(mock).to.have.been.calledWith({
        title: "my search value",
      });
    });
  });
});
