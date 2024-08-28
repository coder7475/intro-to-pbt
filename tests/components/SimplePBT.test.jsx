/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import SimplePBT from "../../src/components/SimplePBT";
import * as fc from "fast-check";

describe("SimplePBT Component", () => {
  it("should render correctly", () => {
    render(<SimplePBT name="John" />);
    expect(screen.getByRole('heading').textContent).toBe('John');
  });

  it.skip("should handle random data correctly", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 10 }),
        (name) => {
          render(<SimplePBT name={name} />);
          expect(screen.getByRole('heading').textContent).toBe(name || 'Unknown');
        }
      ),
      { verbose: true }
    );
  });
});
