/* eslint-disable no-undef */
import { cleanup, render, screen } from "@testing-library/react";
import * as fc from "fast-check";
import Greeting from "../../src/components/Greeting";

describe("Greeting Component", () => {
  it("should render the correct greeting message with name prop", () => {
    render(<Greeting name="John" />);
    const element = screen.getByText(/Hello, John!/i);
    expect(element).toBeInTheDocument();
  });

  it("should render the correct greeting message without name prop", () => {
    render(<Greeting />);
    const element = screen.getByText(/Hello, World!/i);
    expect(element).toBeInTheDocument();
  });

  it("should handle random names correctly", () => {
    fc.assert(
      fc.property(fc.string(), (randomName) => {
        render(<Greeting name={randomName} />);
        const expectedText = randomName.trim() ? `Hello, ${randomName.trim()}!` : "Hello, World!";
        const element = screen.getByText(expectedText);
        expect(element).toBeInTheDocument();
        // cleanup after each test
        cleanup();
      })
    );
  });
});
