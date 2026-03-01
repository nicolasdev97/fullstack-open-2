import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title and author but not url or likes by default", () => {
  const blog = {
    title: "React Testing",
    author: "Juan Pérez",
    url: "https://reacttesting.com",
    likes: 10,
    user: { username: "juan" },
  };

  const user = { username: "juan" };

  const { container } = render(
    <Blog
      blog={blog}
      user={user}
      handleLike={() => {}}
      handleDelete={() => {}}
    />,
  );

  // Check that title and author are rendered

  const summary = container.querySelector(".blog-summary");

  // Check that url and likes are not rendered

  expect(summary).toHaveTextContent("React Testing");
  expect(summary).toHaveTextContent("Juan Pérez");

  // Check that url and likes are not visible

  expect(container).not.toHaveTextContent("https://reacttesting.com");
  expect(container).not.toHaveTextContent("likes 10");
});

test("shows url and likes when view button is clicked", async () => {
  const blog = {
    title: "React Testing",
    author: "Juan Pérez",
    url: "https://reacttesting.com",
    likes: 10,
    user: { username: "juan" },
  };

  const user = { username: "juan" };

  render(
    <Blog
      blog={blog}
      user={user}
      handleLike={() => {}}
      handleDelete={() => {}}
    />,
  );

  const userSim = userEvent.setup();

  // Find the view button
  const button = screen.getByText("view");

  // Click the view button
  await userSim.click(button);

  // Check that url and likes are now visible
  expect(screen.getByText("https://reacttesting.com")).toBeInTheDocument();
  expect(screen.getByText("likes 10")).toBeInTheDocument();
});
