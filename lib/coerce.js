var transform = require('./transform');
var is = require('./is');

function type(v) {
  if (is.array(v)) return v.map(type);

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
