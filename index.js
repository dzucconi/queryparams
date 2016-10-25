var queryparams = require('./lib/queryparams');

module.exports = function(defaults) {
  queryparams(window.location.search.slice(1), defaults || {});
};
