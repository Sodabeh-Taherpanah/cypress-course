import React from "react";
import BackButton from "@/app/components/BackButton";
import Router from "next/router";
/*
As a Single Page Application (SPA) one of the primary features is the Next Router (next/router) which allows for integration between the navigation system (typically the browser's History API) and your application code to allow URL changes to control what component(s) are rendered.
Mock out useRouter

The useRouter hook is a primary mechanism to integrate programmatic control of the Router into your components. It is relatively easy to mock out the hook function to return inseparable stub functions.

See stubbing out 'useRouter' hook in BackButton.cy.js
Mock out Router

useRouter simply searches up the React stack to find a router provider - by building our own with a mocked router implementation we can inspect functions on the router itself for test assertions.

See use mock router implementation in BackButton.cy.js and the custom nextMount command in /cypress/support/component.js
*/
const obj = {
  foo() {},
};
//stub , Replaces the original function with a mock implementation, allowing you to control its behavior directly.
describe("<BackButton />", () => {
  context("stubbing out `useRouter` hook", () => {
    let router;

    beforeEach(() => {
      router = {
        back: cy.stub().as("routerBack"), // Stubbing the router's back function
      };

      cy.stub(Router, "useRouter").returns(router); // Stubbing the useRouter hook to return the custom router object
    });

    it("delegates back call to router on click", () => {
      cy.mount(<BackButton />); // Mount the BackButton component

      cy.get("button").click(); // Simulate a button click

      cy.get("@routerBack").should((mock) => {
        expect(mock).to.have.been.calledOnce; // Assert that the stubbed back method was called
      });
    });
  });
});
//spy Observes and tracks the function’s behavior without altering it.
describe("cy.spy() on click event", () => {
  it("should call onClick handler when button is clicked", () => {
    const clickHandler = cy.spy().as("clickSpy");

    // Mount a button with the click handler
    cy.mount(<button onClick={clickHandler}>Click me</button>);

    // Simulate a button click
    cy.get("button").click();

    // Assert that the click handler was called once
    cy.get("@clickSpy").should("have.been.calledOnce");

    const spy = cy.spy(obj, "foo").as("anyArgs");
    const withFoo = spy.withArgs("foo").as("withFoo"); // Filtering for calls with 'foo'

    obj.foo();

    expect(spy).to.be.called; // This works, as foo() was called
    cy.get("@withFoo").should("be.called"); // Fails because foo() was called with no arguments
    //why:
    //Spying on obj.foo: The cy.spy() correctly tracks the foo() function in obj. This part works fine.

    // Using withArgs('foo'): This creates a filtered spy (withFoo) that will only track calls where foo() was called with the argument 'foo'. However, when you call obj.foo(), you're not passing any arguments, so the withFoo spy doesn't capture this call.

    // Assertion Failure:

    //     expect(spy).to.be.called: This passes because obj.foo() is called (even though no argument is passed).
    //     cy.get('@withFoo').should('be.called'): This fails because the withArgs('foo') spy is only triggered if obj.foo() is called with the argument 'foo', which isn't the case here.
    //fix : obj.foo('foo');  // Now passing the argument 'foo'
  });
});
