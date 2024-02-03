describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'Lenny',
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
})
