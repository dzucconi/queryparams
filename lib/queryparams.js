var qs = require('qs');
var coerce = require('./coerce');
var extend = require('./extend');

module.exports = function(querystring, defaults) {
  return extend({}, defaults, coerce(qs.parse(querystring)));
};
