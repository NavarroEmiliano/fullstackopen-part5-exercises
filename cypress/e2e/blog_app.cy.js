describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
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
})
