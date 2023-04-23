Project Name - Angular Client
=============================

This is the Angular client for the project NBP Client. This client allows users to interact with the server and perform various operations.

Features
--------

-   Users can get the average exchange rate of a currency for a specific date.
-   Users can get the maximum and minimum exchange rates for a currency over a period of time.
-   Users can get the largest difference between exchange rates for a currency over a period of time.

Getting Started
---------------

### Prerequisites

-   Node.js
-   Angular CLI

### Installation

1.  Clone the repository
2.  Run `npm install` to install dependencies
3.  Run `ng serve` to start the development server

### Usage

The client is accessible through a web browser at <http://localhost:4200/> after starting the development server.

Folder Structure
----------------

-   `src/` contains the source code for the client
-   `src/app/` contains the components and services for the client
-   `src/app/components/` contains the UI components for the client
-   `src/app/services/` contains the services for interacting with the server

License
-------

This project is part of an interview application process.

## Testing

In order to run the integration tests go to the root folder, run the `ng serve` and use `testcafe --skip-js-errors chrome integration_test/general_tests.ts` command

## Deployment

The application is deployed and can be access on this webpage `http://nbp-client.s3-website.eu-west-2.amazonaws.com`
