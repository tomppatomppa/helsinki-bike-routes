describe('Journeys Table', () => {
  it('Search by options are correctly set', () => {
    cy.visit('/journeys')

    cy.get('select').contains('Departure_station_name')
    cy.get('select').contains('Return_station_name')
  })
  it('Search input should be disabled by default', () => {
    cy.visit('/journeys')
    cy.get('input').should('be.disabled')
  })

  it('Pressing column should set query param order to ASC and DESC', () => {
    cy.visit('/journeys')

    cy.intercept(
      'GET',
      '/api/journeys?offset=0&limit=50&search=&search_field=&order**'
    ).as('getJourneys')

    //Initial order is ASC
    cy.get('thead > tr > :nth-child(1)').click()
    cy.wait('@getJourneys').then(({ request }) => {
      expect(request.query)
        .to.have.property('order')
        .that.eql(['Departure_station_name', 'ASC'])
    })
    //Set DESC order
    cy.get('thead > tr > :nth-child(1)').click()
    cy.wait('@getJourneys').then(({ request }) => {
      expect(request.query)
        .to.have.property('order')
        .that.eql(['Departure_station_name', 'DESC'])
    })
  })
})
describe('Filling out journey form', () => {
  it('Fill in the form', () => {
    cy.visit('/')
    cy.contains('Toggle Sidebar').click()
    cy.contains('Add Journey').click()

    cy.get('#Departure_station_name').focus()
    cy.get('.mt-2 > :nth-child(1) > .absolute > :nth-child(1)').click()
    cy.get('#Return_station_name').focus()
    cy.get('.mt-2 > :nth-child(1) > .absolute > :nth-child(1)').click()

    cy.get('#Return').click()
    cy.get('#Covered_distance_m').clear()
    cy.get('#Covered_distance_m').type('1000')

    cy.get('form').submit()

    cy.contains('Succesfully added station').should('exist')
  })
})
