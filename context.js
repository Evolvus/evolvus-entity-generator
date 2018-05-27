'use strict';
/*
 ** Get all the required packages
 */
const _ = require("underscore");
/*
 * initContext takes the command line arguments and builds a 'context' object that
 * is subsequently used by the code templates.
 * The description of the attributes is given below with examples.
 * entity - this is the command line parameter.
 *          It can be of the following patterns,
 *          --entity role (all lower case, this is the norm)
 *          --entity user-role (words separated by hyphen)
 *          --entity user-menu-item (multiple words separated by hyphen)
 *          other not preferred patterns are as follows
 *          --entity Role (initCap word)
 *
 * moduleName -- this is an optional parameter.
 *            This is the name of the git module
 */
module.exports.initContext = (program) => {
  var organizationPrefix = 'evolvus';

  if (typeof program.entity === 'undefined' || /\s/.test(program.entity)) {
    program.help();
  }

  if (typeof program.organizationPrefix === 'undefined') {
    organizationPrefix = 'evolvus';
  } else {
    if (/\s/.test(program.organizationPrefix)) {
      program.help();
    }
  }
  // Entity can be user-menu-item, role, Role
  // in initCaps it should become UserMenuItem, Role, Role
  // in camelCase it should become userMenuItem, role, role
  // in lowercase it should become usermenuitem, role, role
  var entitySplices = program.entity.split('-');
  var initCapSplices = [];
  var camelCaseSplices = [];
  var lowerCaseSplices = [];

  for (var i = 0; i < entitySplices.length; i++) {
    initCapSplices[i] = entitySplices[i].charAt(0)
      .toUpperCase() + entitySplices[i].slice(1);
    lowerCaseSplices[i] = entitySplices[i].toLowerCase();
    if (i == 0) {
      camelCaseSplices[i] = entitySplices[i].charAt(0)
        .toLowerCase() + entitySplices[i].slice(1);
    } else {
      camelCaseSplices[i] = initCapSplices[i];
    }
  }

  var entity = lowerCaseSplices.join('-'); // this becomes user-menu-item
  var initCapEntity = initCapSplices.join(''); // this becomes UserMenuItem
  var camelCaseEntity = camelCaseSplices.join(''); // this becomes userMenuItem
  var lowerCaseEntity = lowerCaseSplices.join(''); // this becomes usermenuitem

  const context = {
    // common transformations
    "entity": entity,
    "initCapEntity": initCapEntity,
    "camelCaseEntity": camelCaseEntity,
    "lowerCaseEntity": lowerCaseEntity,
    // for git and npm
    "moduleName": `${organizationPrefix}-${entity}`,
    "moduleDescription": `${initCapEntity} encapsulates ${initCapEntity} functionality across all Evolvus products`,
    // for db folder files
    "schemaName": `${camelCaseEntity}Schema`,
    "schemaCollection": `${camelCaseEntity}Collection`,
    "dbEntityFileName": camelCaseEntity, // used for require
    "dbSchemaFileName": `${camelCaseEntity}Schema`, // used for require
    // for model folder files
    "entityModel": `${camelCaseEntity}Model`,
    "entityModelFileName": `${camelCaseEntity}` //used for require
  };

  return context;
};
