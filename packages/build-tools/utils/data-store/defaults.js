const path = require('path');
const { DataMerger, mappers, matchers, reducers } = require('./data-cache');

module.exports = {
  dataDirs: [],
  basePath: process.cwd(),
  exportPath: process.cwd() + '/data',
  merger: new DataMerger({
    rules: {
      // Maps json text file input to a loaded json object.
      'json-file': {
        match: [
          new matchers.MatchDataFormat('TextFileData'),
          new matchers.MatchFilename(/^.*\.json$/),
        ],
        map: [new mappers.FileLoader(), new mappers.JsonDecoder()],
      },
      // Handle empty (null) values.
      'empty-data': {
        reduce: [new reducers.EmptyDataReducer()],
      },
      // Handles merging the twig namespaces file.
      'twig-namespaces': {
        match: [
          new matchers.MatchKey(
            key => path.basename(key) === 'twig-namespaces.bolt.json',
          ),
        ],
        reduce: [new reducers.TwigNamespaceReducer()],
        final: true,
      },
      // Default merger for standard json objects / arrays.
      'default-merger': {
        match: [new matchers.MatchDataFormat('RawObjectData')],
        reduce: [new reducers.DeepMergeReducer()],
      },
    },
  }),
};
