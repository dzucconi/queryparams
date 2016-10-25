var querystring = require('./lib/querystring');

module.exports = function(defaults) {
  querystring(window.location.search.slice(1), defaults || {});
};
