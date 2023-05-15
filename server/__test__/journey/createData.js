const csvData = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500
2021-05-31T23:56:59,2021-06-01T00:07:14,082,Töölöntulli,113,Pasilan asema,1870,611
2021-05-31T23:56:44,2021-06-01T00:03:26,123,Näkinsilta,121,Vilhonvuorenkatu,1025,399
2021-05-31T23:56:23,2021-06-01T00:29:58,004,Viiskulma,065,Hernesaarenranta,4318,2009
2021-05-31T23:56:11,2021-06-01T00:02:02,004,Viiskulma,065,Hernesaarenranta,1400,350
2021-05-31T23:54:48,2021-06-01T00:00:57,292,Koskelan varikko,133,Paavalinpuisto,1713,366
2021-05-31T23:54:11,2021-06-01T00:17:11,034,Kansallismuseo,081,Stenbäckinkatu,2550,1377
2021-05-31T23:53:04,2021-06-01T00:14:52,240,Viikin normaalikoulu,281,Puotila (M),5366,1304
2021-05-31T23:52:03,2021-06-01T00:15:16,116,Linnanmäki,117,Brahen puistikko,3344,1393`

const journeyWithInvalidReturnStation = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-31T23:57:25,2021-06-01T00:05:46,501,Hanasaari,100,Teljäntie,2043,700
`
const journeyWithValidStations = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-31T23:57:25,2021-06-01T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
`
const oneValidJourneyAndOneInvalidJourney = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-31T23:57:25,2021-06-01T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-05-31T23:57:25,2021-06-01T00:05:46,501,Hanasaari,100,Keilalahti,2043,700
`

//5 journeys starting in 05/2021, 3 journeys starting in 06/21
const journeysStartingFrom501EndingIn503 = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-01T23:57:25,2021-05-02T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,501,Hanasaari,503,Keilalahti,2043,700
2021-06-01T23:57:25,2021-06-02T00:05:46,501,Hanasaari,503,Keilalahti,3000,900
2021-06-01T23:57:25,2021-06-02T00:05:46,501,Hanasaari,503,Keilalahti,3000,900
2021-06-01T23:57:25,2021-06-02T00:05:46,501,Hanasaari,503,Keilalahti,3000,900
`
//5 journeys starting in 05/2021, 3 journeys starting in 06/21
const journeysStartingFrom503EndingIn501 = `Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
2021-05-01T23:57:25,2021-05-02T00:05:46,503,Keilalahti,501,Hanasaari,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,503,Keilalahti,501,Hanasaari,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,503,Keilalahti,501,Hanasaari,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,503,Keilalahti,501,Hanasaari,2043,700
2021-05-01T23:57:25,2021-05-02T00:05:46,503,Keilalahti,501,Hanasaari,2043,700
2021-06-01T23:57:25,2021-06-02T00:05:46,503,Keilalahti,501,Hanasaari,3000,900
2021-06-01T23:57:25,2021-06-02T00:05:46,503,Keilalahti,501,Hanasaari,3000,900
2021-06-01T23:57:25,2021-06-02T00:05:46,503,Keilalahti,501,Hanasaari,3000,900

`
module.exports = {
  csvData,
  journeyWithInvalidReturnStation,
  journeyWithValidStations,
  oneValidJourneyAndOneInvalidJourney,
  journeysStartingFrom501EndingIn503,
  journeysStartingFrom503EndingIn501,
}
