/**
 * Module dependencies
 */

var reduce = require('component-reduce');

/**
 * Parse the 'links' header
 *
 * @param {String} links
 * @param {Boolean} returnConfig
 * @return {Object}
 */

module.exports = function(links, returnConfig) {
  return reduce(links.split(/ *, */), function(obj, str) {
    var parts = str.split(/ *; */);
    var uri = parts[0].slice(1, -1);
    var conf = parseParams(parts.slice(1), {uri: uri});
    var rel = conf.rel;
    if (!rel) return obj;

    var value = returnConfig ? conf : uri;

    return reduce(rel.split(/ +/), function(acc, subrel) {
      if (subrel === '') return acc;
      switch(typeof acc[subrel]) {
        case 'undefined':
          acc[subrel] = value;
          break;
        case 'string':
          acc[subrel] = [acc[subrel], value];
          break;
        default:
          acc[subrel].push(value);
      }
      return acc;
    }, obj);
  }, {});
}

/**
 * Parse key=value parameters
 * @param {Object} params
 * @param {Object} init
 * @return {Object}
 */

function parseParams(params, init) {
  return reduce(params, function(obj, param) {
    var parts = param.split(/ *= */);
    var key = removeQuote(parts[0]);
    obj[key] = removeQuote(parts[1]);
    return obj;
  }, init);
}

/**
 * Remove quotes around a string
 *
 * @param {String} str
 * @return {String}
 */

function removeQuote(str) {
  return str
    .replace(/^"/, '')
    .replace(/"$/, '');
}
