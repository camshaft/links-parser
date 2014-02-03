/**
 * Module dependencies
 */

var reduce = require('reduce');

/**
 * Parse the 'links' header
 *
 * @param {String} links
 * @return {Object}
 */

module.exports = function(links) {
  return reduce(links.split(/ *, */), function(obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
}
