import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlogForm from "./AddBlogForm";

test("calls event handler with correct details when new blog is created", async () => {
  // Mock function to track calls and arguments

  const createBlog = vi.fn();

  // Render the form with the mock function as prop

  render(<AddBlogForm createBlog={createBlog} />);

  // Simulate user typing into the form fields

  const user = userEvent.setup();

  // Get the input fields and the create button

  const inputs = screen.getAllByRole("textbox");

  // Assuming the order of inputs is title, author, url

  const titleInput = inputs[0];
  const authorInput = inputs[1];
  const urlInput = inputs[2];

  // Get the create button

  const createButton = screen.getByText("create");

  // Simulate user typing

  await user.type(titleInput, "Testing React Forms");
  await user.type(authorInput, "Juan Pérez");
  await user.type(urlInput, "https://test.com");

  // Simulate form submission

  await user.click(createButton);

  // Check that the mock function was called once
  expect(createBlog).toHaveBeenCalledTimes(1);

  // Verify that the mock function was called with the correct details

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Testing React Forms",
    author: "Juan Pérez",
    url: "https://test.com",
  });
});
