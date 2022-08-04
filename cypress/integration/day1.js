/// <reference types="cypress"/>

describe('moch reports',()=>{
    it('run1',()=>{
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
        cy.get('a[href="http://www.mybatis.org"]').contains('www.mybatis.org')
    })
    it('run2',()=>{
        cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
       cy.contains('www.mybatis.org').should('contain','www.mybatis.org')
    })
    it('run3 fails to add screenshot',()=>{
      cy.visit('https://petstore.octoperf.com/actions/Catalog.action')
     cy.contains('www.mybatis.org').should('contain','123')
  })
})


/* How to generate Mochawosome reports
Step 1: Installation

        1. Install Mocha
        npm install mocha --save-dev

        2. Install cypress-multi-reporters
        npm install cypress-multi-reporters --save-dev

        3. Install mochawesome
        npm install mochawesome --save-dev

        4. Install mochawesome-merge
        npm install mochawesome-merge --save-dev

        5. Install mochawesome-report-generator
        npm install mochawesome-report-generator --save-dev

One Command to install all the above ones: -
npm install mocha cypress-multi-reporters mochawesome mochawesome-merge mochawesome-report-generator

Step 2: Add reporter settings in cypress.json

"reporter": "cypress-multi-reporters",
    "reporterOptions": {
        "reporterEnabled": "mochawesome",
        "mochawesomeReporterOptions": {
            "reportDir": "cypress/reports/mocha",
            "quite": true,
            "overwrite": false,
            "html": false,
            "json": true
        }
    }

Step 3: Add scripts in package.json file
For Windows -
"scripts": {
    "clean:reports": "if exist cypress\\reports rmdir /s/q cypress\\reports && mkdir cypress\\reports mkdir cypress\\reports\\mochareports",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run",
    "combine-reports": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test" : "npm run scripts || npm run posttest"
  }
 

For Mac

"scripts": {
    "clean:reports": "rm -R -f cypress/reports && mkdir cypress/reports && mkdir cypress/reports/mochareports ",
    "pretest": "npm run clean:reports",
    "scripts": "cypress run",
    "combine-reports": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochareports/report.json",
    "generate-report": "marge cypress/reports/mochareports/report.json -f report -o cypress/reports/mochareports",
    "posttest": "npm run combine-reports && npm run generate-report",
    "test" : "npm run scripts || npm run posttest"
  }

Step 4 - Add Screenshots of failed test cases to report
A. Change screenshot path into cypress.json
"screenshotsFolder": "cypress/reports/mochareports/assets",

B. Add the following code into cypress support/index.js

import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});
/////Later create a reports/mochareport/assets --all this 3 folder under cypress root folder
///execute as-> npm run test
//
*/