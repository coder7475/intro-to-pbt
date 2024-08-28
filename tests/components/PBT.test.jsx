/* eslint-disable react/no-children-prop */
/* eslint-disable no-undef */
import { cleanup, render, screen } from "@testing-library/react";
import PBT from "../../src/components/PBT";
import * as fc from "fast-check";

describe("PBT Component", () => {
  it("should render", () => {
    const mockData = { name: "John", age: 30, children: 2 };

    render(<PBT {...mockData} />);

    expect(
      screen.getByText(/Name: John, Age: 30, Children: 2/i)
    ).toBeInTheDocument();
  });

  it("should handle various edge cases correctly", () => {
    render(<PBT name={null} age={0} children={0} />);
    expect(screen.getByText(/Name: Unknown, Age: 0, Children: 0/i)).toBeInTheDocument();

    render(<PBT name={12345} age={30} children={3} />);
    expect(
      screen.getByText(/Name: Unknown, Age: 30, Children: 3/i)
    ).toBeInTheDocument();

    render(<PBT name="John Doe" age={-10} children={4} />);
    expect(
      screen.getByText(/Name: John Doe, Age: 0, Children: 4/i)
    ).toBeInTheDocument();

    render(<PBT name="Jane Doe" age={40} children={-1} />);
    expect(
      screen.getByText(/Name: Jane Doe, Age: 40, Children: 0/i)
    ).toBeInTheDocument();

    render(<PBT name="Alice" age={30} children={null} />);
    expect(
      screen.getByText(/Name: Alice, Age: 30, Children: 0/i)
    ).toBeInTheDocument();
  });

  it.skip("should handle random data correctly", () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0 }), // Allow empty strings for name
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 0, max: 10 }),
        (name, age, children) => {
          render(<PBT name={name} age={age} children={children} />);
          expect(
            screen.getAllByText(
              `Name: ${name || 'Unknown'}, Age: ${age >= 0 ? age : 0}, Children: ${children >= 0 ? children : 0}`
            )
          ).toBeInTheDocument();

          // cleanup after each test
          cleanup();
        }
      ),
      { verbose: true }
    );
  });
});
