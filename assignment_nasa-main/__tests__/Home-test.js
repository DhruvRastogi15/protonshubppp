import Home from "../screens/Home";
import React from "react";
import renderer from "react-test-renderer";

it("should render the home page without crashing", () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should change state if asteroid id is entered", () => {
  const instanceOf = renderer.create(<Home />).getInstance();
  instanceOf.handleAsteroidId("1234567");
  expect(instanceOf.state.asetroidId).toEqual("1234567");
});
