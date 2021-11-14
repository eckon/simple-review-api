# Simple Review API

## IDEAS

- use token for all authentication
  - resulting in less secure structure for now but easy access for everyone
- use heroku for db and for backend
  - use relation db like postgres probably with typeorm
- use unit tests and e2e tests


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
