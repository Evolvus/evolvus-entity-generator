#!/usr/bin/env node

'use strict';

/*
 ** Get all the required packages
 */
const _ = require("underscore");
const argv = require('minimist')(process.argv.slice(2));

if (!_.has(argv, "entity")) {
  console.log(`Usage: ${process.argv[1]} --entity <entity name> `);
  console.log(`e.g. ${process.argv[1]} --entity application`);
  process.exit(-1);
}

const entityObject = _.pick(argv, "entity");

console.log("entity is: " + entity.entity);

/*
 ** Default constants
 */
const orgName = "evolvus";

console.dir(argv);

console.log("got here");
