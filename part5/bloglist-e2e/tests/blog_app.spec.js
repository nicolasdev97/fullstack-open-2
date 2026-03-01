const { test, expect, beforeEach, describe } = require("@playwright/test");

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
    // Crear segundo usuario
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Otro Usuario",
        username: "otro",
        password: "12345",
      },
    });

    // Crear blog con el usuario actual (juan)
    await createBlog(page, "Blog Privado", "Juan", "url");

    // Cerrar sesión
    await page.getByRole("button", { name: "logout" }).click();

    // Login con el segundo usuario
    await page.getByPlaceholder("Username").fill("otro");
    await page.getByPlaceholder("Password").fill("12345");
    await page.getByRole("button", { name: "login" }).click();

    // Expandir el blog
    const blog = page.locator(".blog", { hasText: "Blog Privado" });

    await blog.getByRole("button", { name: "view" }).click();

    // 🔥 Verificar que NO existe botón remove
    await expect(blog.getByRole("button", { name: "remove" })).toHaveCount(0);
  });
});
