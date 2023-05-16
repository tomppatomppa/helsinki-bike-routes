describe('Stations', () => {
  it('Search by options are correctly set', () => {
    cy.visit('/journeys')

    cy.get('select').contains('Departure_station_name')
    cy.get('select').contains('Return_station_name')
  })
  it('Search input should be disabled by default', () => {
    cy.visit('/journeys')
    cy.get('input').should('be.disabled')
  })

  it('Pressing column should set query param order ASC and DESC', () => {
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
