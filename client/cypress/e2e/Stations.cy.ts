describe('Stations', () => {
  it('Search by options are correctly set', () => {
    cy.visit('/')

    cy.get('select').contains('Nimi')
    cy.get('select').contains('Namn')
    cy.get('select').contains('Name')
    cy.get('select').contains('Osoite')
    cy.get('select').contains('Adress')
  })
  it('Search input should be disabled by default', () => {
    cy.visit('/')
    cy.get('input').should('be.disabled')
  })

  it('Should be able to type when option is selected', () => {
    cy.visit('/')
    cy.get('#dropdown').select('Nimi')

    cy.get('#search-input').type('Hanasaari').should('have.value', 'Hanasaari')
  })

  it('Default query params', () => {
    cy.intercept('GET', '/api/stations**').as('getStations')
    cy.visit('/')

    cy.wait('@getStations').then(({ request }) => {
      expect(request.query).to.deep.equal({
        offset: '0',
        limit: '20',
        search: '',
        search_field: '',
      })
    })
  })
})
