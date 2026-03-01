const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
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
