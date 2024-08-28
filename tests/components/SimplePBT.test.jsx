/* eslint-disable no-undef */
import { cleanup, render, screen } from "@testing-library/react";
import SimplePBT from "../../src/components/SimplePBT";

describe("SimplePBT Component", () => {
  it("should render correctly", () => {
    render(<SimplePBT name="John" />);
    expect(screen.getByRole('heading').textContent).toBe('Name: John');
  });

  it("should handle random data correctly", async() => {
    const fc = await import("fast-check");
    fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3 }),
        (name) => {
          render(<SimplePBT name={name} />);
         screen.debug();
         const element = screen.getByRole('heading');
         expect(element).toBeInTheDocument();
         expect(element.textContent).toBe(`Name: ${name}`);
         // cleanup after each test
         cleanup();
        }
      ),
      { verbose: true }
    );
  });
});
