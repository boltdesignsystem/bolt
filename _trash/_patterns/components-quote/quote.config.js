const faker = require('faker'); // require the faker module
const randomName = faker.name.findName();
//  // how many members we should generate data for
// const memberData = [];
//
// for (var i = 0; i < memberCount; i++) {
//     memberData.push({
//         name: faker.name.findName(), // generate a random name
//         email: faker.internet.email()  // generate a random email address
//     });
// }

module.exports = {
  title: 'Quotes',
  label: 'Filters',
  status: 'in-progress',
  preview: '@preview-full-page',
  tags: ['components'],
  variants: [
    {
      "name": "alt",
      "attribution": {
        "name": randomName
      }
    }
  ],
  context: {
    "name": "quote",
    "quotation": "When everybody loves you, son, that's just about as funky as you can be",
    "attribution": {
      "name": "Mr Jones",
      "title": "Someone just a little more funky"
    }
  },
  schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "Quote",
    "category": "component",
    "type": "object",
    "format": "grid",
    "properties": {
      "name": {
        "type": "string",
        "enum": ["quote"],
        "options": {
          "hidden": true
        }
      },
      "quotation": {
        "title": "Quote Text",
        "type": "string",
        "el": "c-quote",
        "format": "textarea"
      },
      "attribution": {
        "title": "Attribution",
        "required": ["name"],
        "type": "object",
        "properties": {
          "name": {
            "title": "Attribution",
            "description": "Who said it?",
            "comment": "The person being attributed to the quote.",
            "type": "string"
          },
          "title": {
            "title": "Attribution Title",
            "description": "What is their job title?",
            "comment": "Comment about attribution titles",
            "type": "string"
          }
        }
      }
    },
    "required": ["quotation", "attribution"],
    "additionalProperties": false
  }
};
