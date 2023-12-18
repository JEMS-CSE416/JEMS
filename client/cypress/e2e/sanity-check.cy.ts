describe('template spec', () => {
  it('Sanity Check passes! makes sure that cypress checks local host', () => {
    cy.visit('locahost:3000/')
    cy.get('#splash-screen-title').contains("Premium Map Creation/Editing Software that’s really good!")
  })
})
