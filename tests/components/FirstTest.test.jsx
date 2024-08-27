/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import FirstTest from "../../src/components/FirstTest";

describe("FirstTest", () => {
  it("should render", () => {
    render(<FirstTest />);

    screen.debug();
  });
})