const character = require('./src/character.schema');
const connection = require('./src/connection.schema');
const iconGroup = require('./src/icon-group.schema');
const statusDialogueBar = require('./src/status-dialogue-bar.schema');
const svgAnimation = require('./src/bolt-svg-animations/svg-animations.schema');

// collecting all the schemas for all templates used here so it can be accessed in Pattern Lab for docs like so:
// {% set schema = bolt.data.components["@bolt-micro-journeys"].schema.connection %}
// {% include '@utils/schema-docs.twig' with { schema: schema } only %}
module.exports = {
  character,
  connection,
  iconGroup,
  statusDialogueBar,
  svgAnimation,
};
