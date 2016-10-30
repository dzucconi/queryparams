var transform = require('./transform');

function type(v) {
  switch (true) {
  case (v === 'true' || v === true): // Boolean `true`
    return true;
  case (v === 'false' || v === false): // Boolean `false`
    return false;
  case (v === 'null' || v === null): // `null`
    return null;
  case +v == v: // Number
    return +v;
  default:
    return v;
  }
}

module.exports = function(obj) {
  return transform(obj, type);
};
