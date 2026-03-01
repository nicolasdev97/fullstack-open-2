const { test, expect, beforeEach, describe } = require("@playwright/test");

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();

  await page.getByPlaceholder("Title").fill(title);
  await page.getByPlaceholder("Author").fill(author);
  await page.getByPlaceholder("URL").fill(url);

  await page.getByRole("button", { name: "create" }).click();

  await expect(page.locator(".blog", { hasText: title })).toBeVisible();
};

const likeBlog = async (page, title, times) => {
  const blog = page.locator(".blog", { hasText: title });

  await blog.waitFor();

  const viewButton = blog.getByRole("button", { name: "view" });

  if ((await viewButton.count()) > 0) {
    await viewButton.click();
  }

  for (let i = 0; i < times; i++) {
    await blog.getByRole("button", { name: "like" }).click();
  }
};

beforeEach(async ({ page, request }) => {
  // Clear database

  await request.post("http://localhost:3003/api/testing/reset");

  // Create a user to test login

  await request.post("http://localhost:3003/api/users", {
    data: {
      name: "Juan Pérez",
      username: "juan",
      password: "12345",
    },
  });

  // Go to the application frontend

  await page.goto("http://localhost:5173");
});

describe("Blog app", () => {
  test("Login form is shown", async ({ page }) => {
    // Check that the login form is visible

    await expect(page.getByText("log in to application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      // Fill in the login form with correct credentials

      await page.getByPlaceholder("Username").fill("juan");
      await page.getByPlaceholder("Password").fill("12345");
      await page.getByRole("button", { name: "login" }).click();

      // Check that the user is logged in by looking for a welcome message

      await expect(page.getByText("Juan Pérez logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      // Fill in the login form with wrong credentials

      await page.getByPlaceholder("Username").fill("juan");
      await page.getByPlaceholder("Password").fill("wrongpassword");
      await page.getByRole("button", { name: "login" }).click();

      // Check that an error message is shown

      await expect(page.getByText("Wrong credentials")).toBeVisible();
    });
  });
});

describe("When logged in", () => {
  beforeEach(async ({ page }) => {
    // Log in with correct credentials

    await page.getByPlaceholder("Username").fill("juan");
    await page.getByPlaceholder("Password").fill("12345");
    await page.getByRole("button", { name: "login" }).click();

    // Check that the user is logged in

    await expect(page.getByText("Juan Pérez logged in")).toBeVisible();
  });

  test("a new blog can be created", async ({ page }) => {
    // Click the button to show the form for creating a new blog

    await page.getByRole("button", { name: "create new blog" }).click();

    // Fill in the form with blog details

    await page.getByPlaceholder("Title").fill("Playwright Testing");
    await page.getByPlaceholder("Author").fill("Juan Pérez");
    await page.getByPlaceholder("URL").fill("https://playwright.dev");

    // Submit the form to create the blog

    await page.getByRole("button", { name: "create" }).click();

    // Verify that the new blog appears in the list of blogs

    await expect(
      page.locator(".blog-summary", { hasText: "Playwright Testing" }),
    ).toBeVisible();
    await expect(
      page.locator(".blog-summary", { hasText: "Juan Pérez" }),
    ).toBeVisible();
  });

  test("a blog can be liked", async ({ page }) => {
    // Create a new blog to like
    await page.getByRole("button", { name: "create new blog" }).click();

    // Fill in the form with blog details

    await page.getByPlaceholder("Title").fill("Like Testing");
    await page.getByPlaceholder("Author").fill("Juan Pérez");
    await page.getByPlaceholder("URL").fill("https://test.com");

    // Submit the form to create the blog

    await page.getByRole("button", { name: "create" }).click();

    // Verify that the new blog appears in the list of blogs

    const blog = page.locator(".blog", {
      hasText: "Like Testing",
    });

    await expect(blog).toBeVisible();

    // Click the button to show blog details

    await blog.getByRole("button", { name: "view" }).click();

    // Verify the initial number of likes is 0

    await expect(blog.getByText("likes 0")).toBeVisible();

    // Click the like button

    await blog.getByRole("button", { name: "like" }).click();

    // Verify that the number of likes has increased to 1

    await expect(blog.getByText("likes 1")).toBeVisible();
  });

  test("a blog can be deleted by its creator", async ({ page }) => {
    // Create a new blog to delete

    await page.getByRole("button", { name: "new blog" }).click();

    // Fill in the form with blog details

    await page.getByPlaceholder("Title").fill("Delete Testing");
    await page.getByPlaceholder("Author").fill("Juan Pérez");
    await page.getByPlaceholder("URL").fill("https://delete.com");

    // Submit the form to create the blog

    await page.getByRole("button", { name: "create" }).click();

    // Verify that the new blog appears in the list of blogs

    const blog = page.locator(".blog", {
      hasText: "Delete Testing",
    });

    await expect(blog).toBeVisible();

    // Click the button to show blog details

    await blog.getByRole("button", { name: "view" }).click();

    // Set up a listener to handle the confirmation dialog that appears when deleting a blog

    page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Click the delete button

    await blog.getByRole("button", { name: "remove" }).click();

    // Verify that the blog has been removed from the list of blogs

    await expect(blog).not.toBeVisible();
  });

  test("only creator sees the delete button", async ({ page, request }) => {
    // Create a second user

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Otro Usuario",
        username: "otro",
        password: "12345",
      },
    });

    // Create a blog with the first user

    await createBlog(page, "Blog Privado", "Juan", "url");

    // Logout from the first user

    await page.getByRole("button", { name: "logout" }).click();

    // Login with the second user

    await page.getByPlaceholder("Username").fill("otro");
    await page.getByPlaceholder("Password").fill("12345");
    await page.getByRole("button", { name: "login" }).click();

    // Show the details of the blog created by the first user

    const blog = page.locator(".blog", { hasText: "Blog Privado" });

    await blog.getByRole("button", { name: "view" }).click();

    // Verify that the delete button is not visible for the second user

    await expect(blog.getByRole("button", { name: "remove" })).toHaveCount(0);
  });

  test("blogs are ordered according to likes", async ({ page }) => {
    // Create multiple blogs

    await createBlog(page, "Blog 1", "Autor", "url1");
    await createBlog(page, "Blog 2", "Autor", "url2");
    await createBlog(page, "Blog 3", "Autor", "url3");

    // Like the blogs a different number of times

    await likeBlog(page, "Blog 1", 2);
    await likeBlog(page, "Blog 2", 5);
    await likeBlog(page, "Blog 3", 1);

    // Wait for the UI to update the order of blogs

    await page.waitForTimeout(500);

    // Verify that the blogs are ordered by likes in descending order

    const blogs = await page.locator(".blog").allTextContents();

    expect(blogs[0]).toContain("Blog 2");
    expect(blogs[1]).toContain("Blog 1");
    expect(blogs[2]).toContain("Blog 3");
  });
});
