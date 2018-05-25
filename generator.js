'use strict';

const fs = require("fs");
const moustache = require("moustache");


function initialize(orgName, entity) {
  const context = initContext(orgName, entity);
  createDirStructure(context);
  addFiles(context);
};

function initContext(orgName, entity) {
  const context = {
    "entity": entity,
    "moduleName": `${orgName}-${entity}`
  };
  return context;
};

/*
 ** Create the folder structure for entity projects if it does not exist.
 ** The default folder structure is as follows,
 ** entity-module
 ** entity-module/db
 ** entity-module/model
 ** entity-module/test
 */
function createDirStructure(context) {
  /*
   ** List of the folders to be createdt
   */
  var folders = [
    context.moduleName,
    context.moduleName + "/db",
    context.moduleName + "/model",
    context.moduleName + "/test",
    context.moduleName + "/test/db"
  ];

  /*
   ** For each folder in list create if not already exists
   */
  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
  });
};

/*
 ** Add the template code for the project. Moustache templates from the
 ** templates folder is read, processed and written to the approprite
 ** directories.
 */
function addFiles(context) {
  var baseFolder = context.moduleName;
  var templates = listTemplates(__dirname + "/templates");

  templates.forEach((fileName) => {
    var templateText = fs.readFileSync(fileName)
      .toString();
    var text = moustache.render(templateText, context);
    var destinationFileName = fileName.replace(__dirname + "/templates", baseFolder)
      .replace("entity", context.entity);
    fs.writeFileSync(destinationFileName, text, {
      "flag": "wx"
    });
  });
};

/*
 ** List all the templates in the different folders
 */
function listTemplates() {
  var folders = [
    __dirname + "/templates",
    __dirname + "/templates/db",
    __dirname + "/templates/model",
    __dirname + "/templates/test",
    __dirname + "/templates/test/db"
  ];

  var templates = [];
  folders.forEach((folder) => {
    var fileList = fs.readdirSync(folder);
    fileList.forEach((file) => {
      var template = folder + "/" + file;
      if (!fs.statSync(template)
        .isDirectory()) {
        templates.push(template);
      }
    });
  });
  return templates;
};


module.exports = {
  "initialize": initialize
};
