var qs = require('qs');
var enforce = require('./enforce');

module.exports = function(options, defaults) {
  if (defaults) enforce(options, defaults);
  return qs.stringify(options, { indices: false });
};
