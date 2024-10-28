import React from "react";
import Logo from "@/app/components/Logo";
import * as ImageComponent from "next/image";

describe("<Logo />", () => {
  describe("mock image with `cy.intercept`", () => {
    it("renders", () => {
      // Grab image file that this component relies on
      cy.readFile("public/cypress-logo.png", null).then((img) => {
        // Intercept requests to Next backend image endpoint and return expected image
        cy.intercept("_next/image*", {
          statusCode: 200,
          headers: {
            "Content-Type": "image/png",
          },
          body: img.buffer,
        });
        cy.mount(
          <div style={{ backgroundColor: "lightgray" }}>
            <Logo />
          </div>
        );
      });
    });
  });
  // Mocking Next.js Image component
  beforeEach(() => {
    cy.stub(ImageComponent, "default").callsFake((props) => {
      // Replace Next.js Image component with a simple <img> tag in the tests
      return <img {...props} />;
    });
  });
  describe("mock image with component override", () => {
    it("renders the Logo component with a mocked Image", () => {
      cy.mount(
        <div style={{ backgroundColor: "lightgray" }}>
          <Logo />
        </div>
      );

      // Assertions to verify the image is rendered properly
      cy.get("img").should("have.attr", "src").and("include", "logo.png");
    });
  });
});
