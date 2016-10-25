var queryparams = require('./lib/queryparams');

module.exports = function(defaults) {
  return queryparams(window.location.search.slice(1), defaults || {});
};
