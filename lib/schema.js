var transform = require('./transform');

module.exports = function(defaults) {
  return transform(defaults, function(v) {
    return typeof v;
  });
};
