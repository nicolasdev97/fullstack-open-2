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
      // llenar formulario
      cy.get("input[placeholder='Username']").type("juan");
      cy.get("input[placeholder='Password']").type("12345");
      cy.contains("login").click();

      // verificar login
      cy.contains("Juan Pérez logged in");
    });

    it("fails with wrong credentials", function () {
      // llenar formulario con password incorrecto
      cy.get("input[placeholder='Username']").type("juan");
      cy.get("input[placeholder='Password']").type("wrongpassword");
      cy.contains("login").click();

      // verificar mensaje de error
      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)"); // opcional: color rojo
    });
  });
});
