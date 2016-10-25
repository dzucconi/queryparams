var transform = require('./transform');

function type(v) {
  switch (true) {
  case +v == v: // Number
    return +v;
  case v === 'true': // Boolean `true`
    return true;
  case v === 'false': // Boolean `false`
    return false;
  case v === 'null': // `null`
    return null;
  default:
    return v;
  }
}

module.exports = function(obj) {
  return transform(obj, type);
};
