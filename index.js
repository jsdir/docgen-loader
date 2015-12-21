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
  if (query.markdownDescription) {
    formatDescription(docs);

    for (var propName in docs.props) {
      formatDescription(docs.props[propName]);
    }
  }

  return 'module.exports = ' + JSON.stringify(docs) + ';';
};
