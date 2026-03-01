import { test, expect } from "vitest";
import { render } from "@testing-library/react";
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

  const summary = container.querySelector(".blog-summary");

  expect(summary).toHaveTextContent("React Testing");
  expect(summary).toHaveTextContent("Juan Pérez");

  expect(container).not.toHaveTextContent("https://reacttesting.com");
  expect(container).not.toHaveTextContent("likes 10");
});
