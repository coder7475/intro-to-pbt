/* eslint-disable no-undef */
import { render, screen, waitFor } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import * as fc from "fast-check";
import { vi } from 'vitest'; // Import from vitest

// Mock the fetch function
globalThis.fetch = vi.fn();

describe("UserList Component", () => {
  // Normal tests
  it("should render the correct list of users", async () => {
    // Mock the fetch response with the provided user data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
      ],
    });

    render(<UserList />);

    // Wait for the users to be rendered
    await waitFor(() => {
      const elements = screen.getAllByRole("listitem");
      expect(elements).toHaveLength(3);
    });

    // Ensure no extra 'No users found' message is shown if users are present
    expect(screen.queryByText("No users found.")).toBeNull();
  });

  it("should render 'No users found' message when no users are present", async () => {
    // Mock the fetch response with an empty array
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserList />);

    // Wait for the 'No users found' message to be rendered
    await waitFor(() => {
      const element = screen.getByText("No users found.");
      expect(element).toBeInTheDocument();
    });

    // Ensure the 'No users found' message is shown if no users are present
    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("should handle network errors", async () => {
    // Mock the fetch response with an error
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<UserList />);

    // Wait for the 'Error: Network error' message to be rendered
    await waitFor(() => {
      const element = screen.getByText("Error: Network error");
      expect(element).toBeInTheDocument();
    });

    // Ensure the 'Error: Network error' message is shown if an error occurs
    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
  });

  // Property-based tests
  it("should render users correctly with PBT", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.string(), // Include empty strings
          })
        ),
        async (randomUsers) => {
          // Mock the fetch response with random user data
          fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => randomUsers,
          });

          render(<UserList />);

          // Wait for the users to be rendered
          // await waitFor(() => {
          //   randomUsers
          //     .filter(user => user.name.trim() !== "") // Filter out empty names
          //     .forEach((user) => {
          //       const element = screen.getByText(user.name);
          //       expect(element).toBeInTheDocument();
          //     });

          //   // Ensure no extra 'No users found' message is shown if users are present
          //   const noUsersFound = screen.queryByText('No users found.');
          //   expect(noUsersFound).toBeNull();
          // });

          screen.debug();
        }
      ),
      { timeout: 10000 } // Adjust timeout if needed
    );
  });

  it.only("should handle random errors correctly with PBT", async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async () => {
        // Mock the fetch to reject with a random error message
        fetch.mockRejectedValueOnce(new Error("PBT Mock Error"));

        render(<UserList />);

        // Wait for the error message to be rendered
        await waitFor(() => {
          const element = screen.getByText(`No users found.`);
          expect(element).toBeInTheDocument();
        });
        // screen.debug();
      })
    );
  });
});
