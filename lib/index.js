var qs = require('qs');
var coerce = require('./coerce');
var extend = require('./extend');
var enforce = require('./enforce');

module.exports = function(querystring, defaults) {
  var options = coerce(qs.parse(querystring));
  enforce(options, defaults);
  return extend({}, defaults, options);
};
