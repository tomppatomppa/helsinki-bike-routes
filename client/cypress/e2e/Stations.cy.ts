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
        limit: '50',
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
        limit: '50',
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
type StationData = {
  ID: string
  Name: string
  Namn: string
  Nimi: string
  Osoite: string
  Adress: string
}

describe('Station Creation and Deletion', () => {
  beforeEach(() => {
    cy.fixture('stationCreationData.json').as('stationData')
  })
  it('Visits the page', () => {
    cy.visit('/')
    cy.get('button#toggle-sidebar-button').click()
    cy.contains('Add Station').click()
  })
  it('Fill in the form, create', () => {
    cy.visit('/')
    cy.get('button#toggle-sidebar-button').click()
    cy.contains('Add Station').click()

    cy.get('#ID').clear()
    cy.get<StationData>('@stationData').then((station) => {
      cy.get('#ID').type(station.ID)
      cy.get('#Nimi').type(station.Nimi)
      cy.get('#Namn').type(station.Namn)
      cy.get('#Name').type(station.Name)
      cy.get('#Osoite').type(station.Osoite)
      cy.get('#Adress').type(station.Adress)
    })

    cy.get('form').submit()

    cy.contains('Succesfully added station').should('exist')
  })
  it('Toggle expanded row', () => {
    cy.visit('/')
    cy.get('#dropdown').select('Name')
    cy.get('#search-input')
      .type('testStation')
      .should('have.value', 'testStation')
    cy.get('[data-testid="table-rows"] > :nth-child(1) > :nth-child(1) > span')
      .should('be.visible')
      .wait(500)
      .click()
    cy.contains(/station details/i)
  })
  it('Delete created station', () => {
    cy.visit('/')
    cy.get('#dropdown').select('Name')
    cy.get('#search-input')
      .type('testStation')
      .should('have.value', 'testStation')
    cy.get('#delete-station').should('be.visible').wait(500).click()
  })
})
