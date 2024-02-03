describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'Lenny',
      name: 'Emiliano',
      password: 'Password1'
    })
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'Lenny2',
      name: 'Emiliano',
      password: 'Password1'
    })
    cy.visit('')
  })
  it('Login form is shown', () => {
    cy.get('.login-form')
      .as('loginForm')
      .within(() => {
        cy.contains('Username:')
        cy.contains('Password:')
      })
  })

  describe('Login', () => {
    it('Succeeds with correct credentials', () => {
      cy.get('.login-form')
        .as('loginForm')
        .within(() => {
          cy.get('#username').type('Lenny')
          cy.get('#password').type('Password1')
          cy.get('button').click()
        })
      cy.contains('Emiliano logged in')
    })

    it('Fails with wrong credentials', () => {
      cy.get('.login-form')
        .as('loginForm')
        .within(() => {
          cy.get('#username').type('Lenny')
          cy.get('#password').type('Password')
          cy.get('button').click()
        })
      cy.contains('invalid username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
    })
  })

  describe.only('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Lenny', password: 'Password1' })
      cy.createBlog({
        title: 'First blog',
        author: 'beforeEach',
        url: 'This is an url'
      })
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'beforeEach',
        url: 'This is an url',
        likes: 100
      })
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'beforeEach',
        url: 'This is an url',
        likes: 50
      })
    })

    it('A blog can be created', () => {
      cy.contains('New Blog').click()
      cy.get('#title').type('Blog from cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('This is an url')
      cy.contains('Create Blog').click()
      cy.contains('Blog from cypress')
    })

    it('A user can like a blog', () => {
      cy.contains('First blog').within(() => {
        cy.contains('View').click()
        cy.get('.like-btn').click()
        cy.contains('Likes: 1')
      })
    })

    it.only('A user cannot delete an external note', () => {
      cy.login({ username: 'Lenny2', password: 'Password1' })
      cy.contains('First blog').should('not.contain', 'Remove')
    })
  })
})
