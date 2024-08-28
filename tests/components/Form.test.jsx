import { render, screen } from "@testing-library/react";
import Form from "../../src/components/Form";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

/* eslint-disable no-undef */
describe("Form Component", () => {
  it("should render with all elements", () => {
    render(<Form />);

    // Check if the heading renders correctly
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Form");

    // Check if the name input is rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

    // Check if the age input is rendered
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();

    // Check if the children input is rendered
    expect(screen.getByLabelText(/children/i)).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should handle form submission correctly", async () => {
    render(<Form />);
    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);
    const childrenInput = screen.getByLabelText(/children/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Submit the form with valid data
    const user = userEvent.setup();

    await user.type(nameInput, "John");
    await user.type(ageInput, "30");
    await user.type(childrenInput, "2");
    await user.click(submitButton);

    // Check if the form submission was successful
    expect(screen.getByText(/name: john/i)).toBeInTheDocument();
    expect(screen.getByText(/age: 30/i)).toBeInTheDocument();
    expect(screen.getByText(/children: 2/i)).toBeInTheDocument();
  });

  // testing with fast-check
  it("should handle form submission correctly with fast-check", async () => {
    render(<Form />);
    const nameInput = screen.getByLabelText(/name/i);
    const ageInput = screen.getByLabelText(/age/i);
    const childrenInput = screen.getByLabelText(/children/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const user = userEvent.setup();
    const fc = await import("fast-check");
    fc.assert(
      fc.asyncProperty(
        fc.record({
          name: fc.string(),
          age: fc.integer(),
          children: fc.integer(),
        }),
        async (data) => {
          await user.type(nameInput, data.name);
          await user.type(ageInput, data.age.toString());
          await user.type(childrenInput, data.children.toString());
          await user.click(submitButton);
          expect(screen.getByText(`name: ${data.name}`)).toBeInTheDocument();
          expect(screen.getByText(`age: ${data.age}`)).toBeInTheDocument();
          expect(
            screen.getByText(`children: ${data.children}`)
          ).toBeInTheDocument();
        }
      ),
      { verbose: true }
    );
  });
});
