/* eslint-disable react/no-children-prop */
/* eslint-disable no-undef */
import { cleanup, render, screen } from "@testing-library/react";
import PBT from "../../src/components/PBT";

describe("PBT Component", () => {
  it("should render", () => {
    const mockData = { name: "John", age: 30, children: 2 };

    render(<PBT {...mockData} />);

    screen.debug();
  });

  it("should handle random data correctly", async () => {
    const fc = await import("fast-check");
    fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 3 }),
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 0, max: 10 }),
        (name, age, children) => {
          render(<PBT name={name} age={age} children={children} />);

          // Use getAllByRole to handle multiple elements
          const headings1 = screen.getAllByRole("heading", { level: 1 });
          const headings2 = screen.getAllByRole("heading", { level: 2 });
          const headings3 = screen.getAllByRole("heading", { level: 3 });

          expect(headings1).toHaveLength(1);
          expect(headings2).toHaveLength(1);
          expect(headings3).toHaveLength(1);

          expect(headings1[0]).toHaveTextContent(`Name: ${name || "Unknown"}`);
          expect(headings2[0]).toHaveTextContent(`Age: ${age || 0}`);
          expect(headings3[0]).toHaveTextContent(`Children: ${children || 0}`);
          
          // cleanup after each test
          cleanup();
        }
      ),
      { verbose: true }
    );
  });
});
