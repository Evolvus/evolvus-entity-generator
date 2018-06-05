/*
 ** JSON Schema representation of the {{camelCaseEntity}} model
 */
module.exports.schema = {
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "{{entityModel}}",
  "type": "object",
  "properties": {
      "tenantId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 64
    },
  },
  "required": []
};
