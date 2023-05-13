describe('template spec', () => {
  it('Visits the root route and shows elements in mainlayout', () => {
    cy.visit('/')

    //Ui MainLayout elements in Stations route

    //Sidebar
    cy.get('[data-testid="sidebar-element"]').should('not.exist')

    //Header
    cy.get('[data-testid="header-element"]').should('exist')
    cy.contains('Toggle Sidebar')

    //Footer
    cy.get('[data-testid="footer-element"]').should('exist')

    //Map
    cy.get('.leaflet-container').should('exist')

    //Station table
    cy.get('[data-testid="station-table"]').should('exist')
  })
  describe('Sidebar', () => {
    it('Should open sidebar and close sidebar', () => {
      cy.visit('/')

      cy.get('[data-testid="sidebar-element"]').should('not.exist')
      //Open
      cy.contains('Toggle Sidebar').click()
      cy.get('[data-testid="sidebar-element"]').should('exist')

      //Close
      cy.get('[id="close-button"]').click()
      cy.get('[data-testid="sidebar-element"]').should('not.exist')
    })
    it('Sidebar should contain menu items', () => {
      cy.visit('/')

      cy.contains('Toggle Sidebar').click()

      cy.get('[data-testid="sidebar-element"]').contains('Menu')
      cy.get('[data-testid="sidebar-element"]').contains('Journeys')
      cy.get('[data-testid="sidebar-element"]').contains('Stations')
      cy.get('[data-testid="sidebar-element"]').contains('Upload File')
    })
    it('Clicking Journeys should change route', () => {
      cy.visit('/')
      cy.contains('button', 'Toggle Sidebar').click()

      cy.contains('Journeys').click()
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/journeys')
      })
    })
  })
})
