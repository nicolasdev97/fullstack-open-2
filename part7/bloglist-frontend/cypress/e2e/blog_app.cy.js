describe("Blog app", function () {
  beforeEach(function () {
    // Reset the database before each test

    cy.request("POST", "http://localhost:3003/api/testing/reset")

    // Create a user for testing

    const user = {
      name: "Juan Pérez",
      username: "juan",
      password: "12345",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)

    // Visit the application

    cy.visit("/")
  })

  it("Login form is shown", function () {
    cy.contains("Log in to application")
    cy.get("input[placeholder='Username']")
    cy.get("input[placeholder='Password']")
    cy.contains("login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      // Full login form

      cy.get("input[placeholder='Username']").type("juan")
      cy.get("input[placeholder='Password']").type("12345")
      cy.contains("login").click()

      // Verify successful login

      cy.contains("Juan Pérez logged in")
    })

    it("fails with wrong credentials", function () {
      // Full login form with wrong password

      cy.get("input[placeholder='Username']").type("juan")
      cy.get("input[placeholder='Password']").type("wrongpassword")
      cy.contains("login").click()

      // Verify error message

      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      // Log in before each test in this block

      cy.get("input[placeholder='Username']").type("juan")
      cy.get("input[placeholder='Password']").type("12345")
      cy.contains("login").click()

      // Verify successful login

      cy.contains("Juan Pérez logged in")
    })

    it("A blog can be created", function () {
      // Open the form to create a new blog

      cy.contains("create new blog").click()

      // Fill in the form to create a new blog

      cy.get("form").within(() => {
        cy.get("input[placeholder='Title']").type("Cypress Testing")
        cy.get("input[placeholder='Author']").type("Juan Pérez")
        cy.get("input[placeholder='URL']").type("https://cypress.io")

        cy.contains("create").click()
      })

      // Verify that the new blog is displayed

      cy.contains("Cypress Testing Juan Pérez")
    })

    it("A user can like a blog", function () {
      // Open the form to create a new blog

      cy.contains("create new blog").click()

      // Fill in the form to create a new blog

      cy.get("form").within(() => {
        cy.get("input[placeholder='Title']").type("Blog to Like")
        cy.get("input[placeholder='Author']").type("Juan Pérez")
        cy.get("input[placeholder='URL']").type("https://cypress.io")

        cy.contains("create").click()
      })
      // Abrir los detalles del blog

      cy.contains("Blog to Like").parent().contains("view").click()

      // Verify that the blog starts with 0 likes

      cy.contains("likes 0")

      // Click the like button

      cy.contains("Blog to Like").parent().contains("like").click()

      // Verify that the likes have increased to 1

      cy.contains("likes 1")

      // Click the like button again

      cy.contains("Blog to Like").parent().contains("like").click()

      // Verify that the likes have increased to 2

      cy.contains("likes 2")
    })

    it("A user who created a blog can delete it", function () {
      // Open the form to create a new blog

      cy.contains("create new blog").click()

      // Fill in the form to create a new blog

      cy.get("form").within(() => {
        cy.get("input[placeholder='Title']").type("Blog to Delete")
        cy.get("input[placeholder='Author']").type("Juan Pérez")
        cy.get("input[placeholder='URL']").type("https://cypress.io")

        cy.contains("create").click()
      })
      // Abrir los detalles del blog
      cy.contains("Blog to Delete")
        .parent() // Contenedor del blog
        .contains("view")
        .click()

      // Verificar que el botón remove sea visible
      cy.contains("Blog to Delete")
        .parent()
        .contains("remove")
        .should("be.visible")

      // Hacer clic en remove y confirmar
      cy.contains("Blog to Delete").parent().contains("remove").click()

      // Cypress no necesita el dialogo manual si usas window.confirm por defecto,
      // si necesitas, puedes stubearlo:
      cy.on("window:confirm", () => true)

      // Verificar que el blog desapareció
      cy.contains("Blog to Delete").should("not.exist")
    })
  })

  describe("Blog app - delete button visibility", function () {
    beforeEach(function () {
      // Create a second user for testing

      const user = {
        name: "Mario Gómez",
        username: "mario",
        password: "54321",
      }
      cy.request("POST", "http://localhost:3003/api/users", user)

      // Login like the first user and create a blog

      cy.login({ username: "juan", password: "12345" })

      cy.createBlog({
        title: "Blog Restricted Delete",
        author: "Juan Pérez",
        url: "https://restricted.com",
      })
    })

    it("Creator can see the delete button", function () {
      // Open the details of the blog created by the first user

      cy.contains("Blog Restricted Delete").parent().contains("view").click()

      // Verify that the remove button is visible for the creator

      cy.contains("Blog Restricted Delete")
        .parent()
        .contains("remove")
        .should("be.visible")
    })

    it("Other users cannot see the delete button", function () {
      // Logout the first user

      cy.contains("logout").click()

      // Login with the second user

      cy.login({ username: "mario", password: "54321" })

      // Open the details of the blog created by the first user

      cy.contains("Blog Restricted Delete").parent().contains("view").click()

      // Verify that the remove button is not visible for other users

      cy.contains("Blog Restricted Delete")
        .parent()
        .contains("remove")
        .should("not.exist")
    })
  })

  describe("When logged in - Order likes", function () {
    beforeEach(function () {
      // Login

      cy.login({ username: "juan", password: "12345" })

      // Create multiple blogs with different titles

      cy.createBlog({ title: "Blog 1", author: "Autor", url: "url1" })
      cy.createBlog({ title: "Blog 2", author: "Autor", url: "url2" })
      cy.createBlog({ title: "Blog 3", author: "Autor", url: "url3" })
    })

    it("blogs are ordered according to likes", function () {
      // Like the blogs a different number of times waiting a bit between likes to ensure the backend updates

      cy.contains("Blog 1").parent().find("button").contains("view").click()
      cy.contains("Blog 1").parent().contains("like").click()
      cy.wait(500)
      cy.contains("Blog 1").parent().contains("like").click()
      cy.wait(500)

      cy.contains("Blog 2").parent().find("button").contains("view").click()
      cy.contains("Blog 2").parent().contains("like").click()
      cy.wait(500)
      cy.contains("Blog 2").parent().contains("like").click()
      cy.wait(500)
      cy.contains("Blog 2").parent().contains("like").click()
      cy.wait(500)
      cy.contains("Blog 2").parent().contains("like").click()
      cy.wait(500)
      cy.contains("Blog 2").parent().contains("like").click()

      cy.contains("Blog 3").parent().find("button").contains("view").click()
      cy.contains("Blog 3").parent().contains("like").click()
      cy.wait(500)

      // Verify that the blogs are ordered by likes (Blog 2 with 5 likes, Blog 1 with 2 likes, Blog 3 with 1 like)

      cy.get(".blog").eq(0).should("contain", "Blog 2")
      cy.get(".blog").eq(1).should("contain", "Blog 1")
      cy.get(".blog").eq(2).should("contain", "Blog 3")
    })
  })
})
