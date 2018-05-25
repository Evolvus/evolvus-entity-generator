#!/usr/bin/env node

'use strict';

/*
 ** Get all the required packages
 */
const _ = require("underscore");
const argv = require('minimist')(process.argv.slice(2));
const fs = require("fs");
const gen = require("./generator")
/*
 ** Minimum command line requirement for this CLI application is entity
 ** If that is not provided exit the application.
 */
if (!_.has(argv, "entity")) {
  console.log(`Usage: ${process.argv[1]} --entity <entity name> `);
  console.log(`e.g. ${process.argv[1]} --entity application`);
  process.exit(-1);
}

/*
 ** Get the entity, now that we are sure it exists in argv
 */
const entity = _.pick(argv, "entity")
  .entity;

const orgName = "evolvus";
/*
 ** Derive the different values needed for replacement
 */
gen.initialize(orgName, entity);

console.log("Done");
console.log("Navigate to evolvus-", entity);
console.log("Run npm install to initialize the project");
