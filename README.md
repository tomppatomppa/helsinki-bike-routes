<h1 align="center">
  <br>
  Helsinki city bike app
  <br>
</h1>

<h4 align="center">This web-based app that allows users to view data from journeys made with city bikes in the Helsinki Capital area. The platform will have both a user interface (UI) and a backend service. The UI allows users to easily navigate through the different features and view data about the city bike journeys. The backend service will be responsible for storing, validating, and processing the data from the city bike journeys. Users will be able to view a variety of data, such as the start and end locations of a journey, the duration and the distance covered by a journey. The app also include additional features, such as map view that allows users to visualize stations and see detailed statistics about a specific station. Built with <a href="https://nodejs.org/en" target="_blank">Node.js</a>, <a href="https://react.dev/" target="_blank">React</a>, <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, <a href="https://tanstack.com/" target="_blank">React Query</a>, <a href="https://leafletjs.com/" target="_blank">Leaflet</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>.</h4>

<p align="center">
  <a href="#journey-features">Journey Features</a> •
  <a href="#station-features">Station Features</a> •
  <a href="#single-station-features">Single Station Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#description">Description</a> •
  <a href="#license">License</a>
</p>

## Journeys Features

- Import journey data from the CSV files
- Validate data before importing
- Journey list view: Pagination, Searching, Ordering per column
- For each journey show departure and return stations, covered distance in kilometers and duration in minutes
- Easily extendable to show more columns
- UI for adding journeys
- e2e tests

## Station Features

- Import station data from the CSV files
- Validate data before importing
- Station list view: Pagination, Searching, Delete station
- For each station show station names and addresses
- Expandable row with Station details

## Single Station View Features

- Station name
- Station address
- Total number of journeys starting from the station
- Total number of journeys ending at the station
- Top 5 most popular return stations for journeys starting from the station
- Top 5 most popular departure stations for journeys ending at the station
- Ability to filter all the calculations per month
- Station location on the map

## How To Use

> **Note**
> For Windows only

```bash

# Clone this repository
$ git clone https://github.com/tomppatomppa/helsinki-bike-routes.git

# Go to server folder
$ cd helsinki-bike-routes/server

# Connect a postgres database
# Create a .env file in the server folder with the following contents
# Tested with https://api.elephantsql.com/ and local https://www.postgresql.org/
# e.g 'postgres://postgres:<password>@localhost:5432/mydatabase' for local database connection
$ DATABASE_URL="connectionstring"
$ TEST_DATABASE_URL="testdatabaseurl"

# Install dependencies
$ npm install

# Run script to create a client build
# Or run the client seperately by going to /client folder and run npm start
$ npm run build:dev

# Start server
$ npm run dev

# Open browser
$ http://localhost:3001/

# Populate the database with station.csv and journey.csv found in /client/data folder
# Press menu icon -> Upload File -> /client/data/stations.csv
# Upload File -> select /client/data/journeys.csv
```

## Run Server Tests

> **Note**
> For Windows only

```bash
# Go to server folder
$ cd ./server

# Remember to set the TEST_DATABASE_URL in .env file

# Run Server test
$ npm run test

# Run individual test files by changing <testfile.js>.test.js to your preferred test file
# e.g "test:single": "set NODE_ENV=test&&  jest --runInBand --silent --testPathPattern=isFloat.test.js",
$ npm run test:single

```

## Run Client Tests

> **Note**
> For Windows only

```bash
# Go to client folder
$ cd ./client

# Run client tests
$ npm run test

```

## Run e2e Cypress Tests

> **Note**
> For Windows only

```bash

# Start server before running e2e tests
$ cd ./server
$ npm run dev

# Go to client folder and start client before running e2e tests
$ cd ./client
$ npm run dev

# Run client tests in another terminal
$ npm run cy:open-e2e

```

## Description

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/en)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [ReactQuery](https://tanstack.com/)
- [Tailwind](https://tailwindcss.com/)

## Live Website

https://bike-routes.herokuapp.com/

## License

MIT

---

> GitHub [@tomppatomppa](https://github.com/tomppatomppa) &nbsp;&middot;&nbsp;
