# Simple Review API


## API Documentation

A swagger documentation can be found under `/api`

## Usage

- create a `Collection` and link all the reviews to the created `Collection`
- no authentication is needed, "safety" is given by collections being hidden


## Installation

```bash
$ npm install
```


## Production

```bash
# production mode
$ npm run start:prod
```


## Development

```bash
# watch mode
$ npm run start:dev

# database
$ docker-compose up
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


# Dev


## Heroku

The backend is being hosted by heroku. It uses ci/cd to generate and deploy it. Also the database is hosted on heroku.
Some parts of the repository are only for the heroku implementation.

These are mainly for the start of the application and how to connect to the heroku database.

- [Procfile](./Procfile)
  - tells heroku the entry point of the application


## Structure

- `Collection` have multiple `Reviews` that describe a common thing (food review, hotel review, etc.)
  - these will allow a connection between multiple `Reviews`, meaning that two Reviewers are always different entities, when they are not in the same collection (even if they are the same in reality)
- `Review` is one rating for a specific thing, it will be connected to other `Reviews` via a `Collection`
- additional meta data like completions etc. are linked by the `Collection`
  - meaning if we want to get all possible already created Reviewers for a new `Review` then this can only be achieved by requesting the data from the `Collection` which internally requests different data from the `Reviews`
