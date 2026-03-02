describe("Blog app", function () {
  beforeEach(function () {
    // Reset the database before each test

    cy.request("POST", "http://localhost:3003/api/testing/reset");

    // Create a user for testing

    const user = {
      name: "Juan Pérez",
      username: "juan",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);

    // Visit the application

    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("input[placeholder='Username']");
    cy.get("input[placeholder='Password']");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      // Full login form

      cy.get("input[placeholder='Username']").type("juan");
      cy.get("input[placeholder='Password']").type("12345");
      cy.contains("login").click();

      // Verify successful login

      cy.contains("Juan Pérez logged in");
    });

    it("fails with wrong credentials", function () {
      // Full login form with wrong password

      cy.get("input[placeholder='Username']").type("juan");
      cy.get("input[placeholder='Password']").type("wrongpassword");
      cy.contains("login").click();

      // Verify error message

      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // Log in before each test in this block

      cy.get("input[placeholder='Username']").type("juan");
      cy.get("input[placeholder='Password']").type("12345");
      cy.contains("login").click();

      // Verify successful login

      cy.contains("Juan Pérez logged in");
    });

    it("A blog can be created", function () {
      // Open the form to create a new blog

      cy.contains("create new blog").click();

      // Fill in the form to create a new blog

      cy.get("form").within(() => {
        cy.get("input[placeholder='Title']").type("Cypress Testing");
        cy.get("input[placeholder='Author']").type("Juan Pérez");
        cy.get("input[placeholder='URL']").type("https://cypress.io");

        cy.contains("create").click();
      });

      // Verify that the new blog is displayed

      cy.contains("Cypress Testing Juan Pérez");
    });

    it("A user can like a blog", function () {
      // Open the form to create a new blog

      cy.contains("create new blog").click();

      // Fill in the form to create a new blog

      cy.get("form").within(() => {
        cy.get("input[placeholder='Title']").type("Blog to Like");
        cy.get("input[placeholder='Author']").type("Juan Pérez");
        cy.get("input[placeholder='URL']").type("https://cypress.io");

        cy.contains("create").click();
      });
      // Abrir los detalles del blog

      cy.contains("Blog to Like").parent().contains("view").click();

      // Verify that the blog starts with 0 likes

      cy.contains("likes 0");

      // Click the like button

      cy.contains("Blog to Like").parent().contains("like").click();

      // Verify that the likes have increased to 1

      cy.contains("likes 1");

      // Click the like button again

      cy.contains("Blog to Like").parent().contains("like").click();

      // Verify that the likes have increased to 2

      cy.contains("likes 2");
    });
  });
});
