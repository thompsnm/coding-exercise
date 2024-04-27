## Relevant URLs

This app is hosted on Heroku at: https://placementsio-coding-exercise-7a69e9cdc6e3.herokuapp.com/

Coverage for the tests is recorded at: https://coveralls.io/github/thompsnm/coding-exercise

## Build / Test Instructions

This app is built and run using Node.js Version 20

### Install Dependencies

```
npm install
```

### Build Frontend

```
npm run build
```

### Serve Locally

Only possible if you have access to the Heroku account where this is hosted:

```
npm run start-dev
```

### Run Unit / Component Tests

```
npm test
```

### Run Cypress

```
npm run cy:open
```

### Seed Database

Only possible if you have access to the Heroku account where this is hosted:

```
npm run reset-db
```

## Features Implemented:

### Bucket 2

#### Campaign and ad create / the ability to archive objects

I chose these featues because they gave the Cypress test the ability to generate its own test
data rather than relying on some portion of the seed data to be in the database. This creates
a more stable test setup as developers don't need to tip toe around special test data hidden
in the database.

#### Good unit tests

I went beyond unit tests to deliver a good general test architecture. One major shortcoming
of only using unit tests to verify the frontend and backend is that there is no bridge that
connects the verification of both systems. Teams will commonly run into situations in which
the frontend component tests use mocked API responses to force the UI into a variety of
states (this is good as it allows easy verification of error states and difficult to
replicate backend functionality), leaving them unaware of any changes to the actual API.
When an endpoint does change the mock remains the same and all frontend tests continue to
pass even though Production is actually broken. In order to cover that case I added a
Cypress test that exercises the fully deployed app to ensure the integration between
frontend and backend continues to work.

This solution isn't perfect though. End-to-end tests with a tool like Cypress are inherently
slow and prone to flakiness issues, which usually results in them being pushed later in the
verification process. In order to have more stability I would consider adding contract
testing with a tool like [Pact](https://pact.io/). Contract testing tools exercise the API
to ensure it is working as expected while also saving the responses from the real backend.
They then take those responses to create a mock backend that can be used to exercise the
frontend (or other microservices). By using it to supplement or even replace the hardcoded
mocks in the frontend tests we get the stability of a mocked backend while also ensuring the
mocks are automatically kept up to date. Contract testing also has some added benefits for
API developers when it comes to cataloging the use of the API ahead of breaking changes.

### Bucket 3

#### An integration with an external service that makes sense

Keeping with my focus on testing infrastructure, I added an integration to Coveralls for 
code coverage tracking:

https://coveralls.io/github/thompsnm/coding-exercise

This is configured to use a TravisCI build that runs on every push to `main` and gathers
coverage information from both the unit tests on the server side and component tests on the
client side and uses `nyc` to merge everything into a unified report. This provides a pretty
good picture of the areas I'm testing in this project, but it's missing the coverage 
provided by Cypress. Adding that coverage to the report would be relatively straightforward
and is documented in [Cypress' guides](https://docs.cypress.io/guides/tooling/code-coverage),
but doing so is out of scope for this coding challenge.

## Architectural Decisions

### Using a relational database vs a NoSQL database

Given the relationship between ads and campaigns I felt it would be easier to structure
queries if those relationships were captured in a relational database.

### Using Node.js

Node.js is ideal for microservices that are intended to accept requests and quickly usher
them along to other parts of the backend. That fits the structure of this project well.
However, one issue with JavaScript in general is that
[the JavaScript Number type is a double-precision 64-bit binary format IEEE 754 value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_encoding),
which means number precission is limited to somewhere between 15 and 17 digits. The
seed data for this project routinely uses 17 digits of precision, so the arithmetic to
generate invoice values is typically rounded to 16 digits of precision. If the project
required that high precision be maintained I would need to bring in a different language
to do those calculations.