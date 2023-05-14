const csvData = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
2,503,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,Esbo,CityBike Finland,28,24.827467,60.171524
3,505,Westendinasema,Westendstationen,Westendinasema,Westendintie 1,Westendvägen 1,Espoo,Esbo,CityBike Finland,16,24.805758,60.168266
4,507,Golfpolku,Golfstigen,Golfpolku,Golfpolku 3,Golfstigen 3,Espoo,Esbo,CityBike Finland,16,24.796136,60.168143
5,509,Revontulentie,Norrskensvägen,Revontulentie,Revontulentie 10,Norrskensvägen 10,Espoo,Esbo,CityBike Finland,30,24.802938,60.171551
6,511,Sateentie,Regnvägen,Sateentie,Sateentie 2,Regnvägen 2,Espoo,Esbo,CityBike Finland,18,24.810688,60.173424
7,513,Hakalehto,Hagliden,Hakalehto,Merituulentie 18,Havsvindsvägen 18,Espoo,Esbo,CityBike Finland,24,24.79139,60.173567
8,515,Oravannahkatori,Gråskinnstorget,Oravannahkatori,Oravannahkatori 1,Gråskinnstorget 1,Espoo,Esbo,CityBike Finland,16,24.792559,60.175769
9,517,Länsituuli,Västanvinden,Länsituuli,Länsituulenkuja 3,Västanvindsgränden 3,Espoo,Esbo,CityBike Finland,24,24.802049,60.175358`

const stationsWithoutOptionalFields = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,,Esbo,CityBike Finland,10,24.840319,60.16582
2,503,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,,CityBike Finland,28,24.827467,60.171524
3,505,Westendinasema,Westendstationen,Westendinasema,Westendintie 1,Westendvägen 1,Espoo,Esbo,,16,24.805758,60.168266
`
const stationsWithInvalidCoordinates = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,,Esbo,CityBike Finland,10,,60.16582
2,503,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,,CityBike Finland,28,24.827467,
3,505,Westendinasema,Westendstationen,Westendinasema,Westendintie 1,Westendvägen 1,Espoo,Esbo,,16,200.805758,60.168266
4,507,Golfpolku,Golfstigen,Golfpolku,Golfpolku 3,Golfstigen 3,Espoo,Esbo,CityBike Finland,16,24.796136,-90.168143
5,509,Revontulentie,Norrskensvägen,Revontulentie,Revontulentie 10,Norrskensvägen 10,Espoo,Esbo,CityBike Finland,30,,
`
const stationsWithInvalidNames = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
2,503,Keilalahti,,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,Esbo,CityBike Finland,28,24.827467,60.171524
3,505,Westendinasema,Westendstationen,,Westendintie 1,Westendvägen 1,Espoo,Esbo,CityBike Finland,16,24.805758,60.168266
4,507,,,,Golfpolku 3,Golfstigen 3,Espoo,Esbo,CityBike Finland,16,24.796136,60.168143
`
const stationsWithInvalidAddress = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
2,503,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,,Espoo,Esbo,CityBike Finland,28,24.827467,60.171524
3,505,Westendinasema,Westendstationen,Westendinasema,,,Espoo,Esbo,CityBike Finland,16,24.805758,60.168266
`

const stationsWithInvalidKapasiteet = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,,24.840319,60.16582
2,503,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,Esbo,CityBike Finland,-2,24.827467,60.171524
3,505,Westendinasema,Westendstationen,Westendinasema,Westendintie 1,Westendvägen 1,Espoo,Esbo,CityBike Finland,string,24.805758,60.168266
`

const stationsWithDuplicateFID = `FID,ID,Nimi,Namn,Name,Osoite,Adress,Kaupunki,Stad,Operaattor,Kapasiteet,x,y
1,501,Hanasaari,Hanaholmen,Hanasaari,Hanasaarenranta 1,Hanaholmsstranden 1,Espoo,Esbo,CityBike Finland,10,24.840319,60.16582
2,501,Keilalahti,Kägelviken,Keilalahti,Keilalahdentie 2,Kägelviksvägen 2,Espoo,Esbo,CityBike Finland,28,24.827467,60.171524
`

module.exports = {
  csvData,
  stationsWithoutOptionalFields,
  stationsWithInvalidCoordinates,
  stationsWithInvalidNames,
  stationsWithInvalidAddress,
  stationsWithInvalidKapasiteet,
  stationsWithDuplicateFID,
}
