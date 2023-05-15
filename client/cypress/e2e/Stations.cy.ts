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
  it('Expect request to have correct search and search_field params', () => {
    cy.visit('/')
    cy.get('#dropdown').select('Nimi')
    cy.get('#search-input').type('Hanasaari').should('have.value', 'Hanasaari')

    cy.intercept('GET', '/api/stations**').as('getStations')

    cy.wait('@getStations').then(({ request }) => {
      expect(request.query).to.deep.equal({
        offset: '0',
        limit: '20',
        search: 'Hanasaari',
        search_field: 'Nimi',
      })
    })
  })
  it('Should hide map and show on button click', () => {
    cy.visit('/')
    cy.get('.leaflet-container').should('be.visible')
    cy.contains('button', 'Hide Map').click()

    cy.get('.leaflet-container').should('not.exist')

    cy.contains('button', 'Show Map').click()
    cy.get('.leaflet-container').should('be.visible')
  })
})
