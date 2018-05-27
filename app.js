#!/usr/bin/env node

'use strict';

/*
 ** Get all the required packages
 */
const _ = require("underscore");
const program = require('commander');
const context = require("./context");
const gen = require("./generator");

program.version('0.1.0')
  .option('--entity <entity name>', 'Mandatory, Name of the entity, should not contain spaces')
  .option('--organization-prefix [prefix]', 'Optional, Prefix to be attached to the module, defaults to `evolvus`, should not contain spaces')
  .parse(process.argv);

const initializedContext = context.initContext(program);
gen.initialize(initializedContext);

console.log("Done");
console.log(`Navigate to ${initializedContext.moduleName}`);
console.log("Run npm install to initialize the project");
