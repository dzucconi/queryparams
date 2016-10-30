var is = require('./is');

module.exports = function(options, defaults) {
  if (is.empty(options) || is.empty(defaults)) return;

  Object.keys(defaults).forEach(function(key) {
    if (is.null(defaults[key]) || is.null(options[key])) return;

    if (!(typeof defaults[key] === typeof options[key])) {
      throw new Error(key + ' should be a ' + typeof defaults[key]);
    }
  });
};
