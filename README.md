<h1 align="center">
  <br>
  Helsinki city bike app
  <br>
</h1>

<h4 align="center">This web-based app that allows users to view data from journeys made with city bikes in the Helsinki Capital area. The platform will have both a user interface (UI) and a backend service. The UI allows users to easily navigate through the different features and view data about the city bike journeys. The backend service will be responsible for storing, validating, and processing the data from the city bike journeys. Users will be able to view a variety of data, such as the start and end locations of the journeys, the duration of the journeys, and the distance covered and duration or searching for a specific station or journey. The platform may also include additional features, such as map view that allows users to visualize the stations. Built with <a href="https://nodejs.org/en" target="_blank">Node.js</a>, <a href="https://react.dev/" target="_blank">React</a>, <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, <a href="https://tanstack.com/" target="_blank">React Query</a>, <a href="https://leafletjs.com/" target="_blank">Leaflet</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#limitations">Limitations</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#description">Description</a> •
  <a href="#features">New Features</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Import station/journey data from the CSV files
- Validate data before importing
- Don't import journeys that lasted for less than ten seconds
- Don't import journeys that covered distances shorter than 10 meters

## Journeys Features

- Import journey data from the CSV files
- Validate data before importing
- Journey list view: Pagination, Searching, Ordering per column
- For each journey show departure and return stations, covered distance in kilometers and duration in minutes
- Easily extendable to show more columns

## Station Features

- Import station data from the CSV files
- Validate data before importing
- Journey list view: Pagination, Searching
- For each station show station names and addresses

## Single Station View

- Station name
- Station address
- Total number of journeys starting from the station
- Total number of journeys ending at the station
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



```

## Run Client Tests

> **Note**
> For Windows only

```bash
# Go to client folder
$ cd ./client

# Run client tests
$ npm test

```

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/en)
- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [ReactQuery](https://tanstack.com/)
- [Tailwind](https://tailwindcss.com/)

## Live Website

A Working Version Hosted On Heroku

## License

MIT

---

> GitHub [@tomppatomppa](https://github.com/tomppatomppa) &nbsp;&middot;&nbsp;
