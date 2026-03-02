describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("/");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("input[placeholder='Username']");
    cy.get("input[placeholder='Password']");
    cy.contains("login");
  });
});
