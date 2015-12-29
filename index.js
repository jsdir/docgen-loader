/*
MIT License http://www.opensource.org/licenses/mit-license.php
Author Eisi Sig @eisisig
 */
var docgen = require('react-docgen');
var findAllComponentDefinitions = require('react-docgen/dist/resolver/findAllComponentDefinitions');
var marked = require('marked');
var loaderUtils = require('loader-utils');

function formatDescription(item) {
  if (item.description) {
    item.description = marked(item.description);
  }
}

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);

  var docs = docgen.parse(source, findAllComponentDefinitions);

  if (docs.length > 0) {
    var componentDocs = docs[0];
    if (query.markdownDescription) {
      formatDescription(componentDocs);

      for (var propName in componentDocs.props) {
        formatDescription(componentDocs.props[propName]);
      }
    }
  }

  this.values = [docs];

  return 'module.exports = ' + JSON.stringify(docs) + ';';
};
