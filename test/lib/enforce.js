var enforce = require('../../lib/enforce');

describe('enforce', function() {
  it('throws when one of the value types from defaults does not match', function() {
    (function() {
      enforce({ visible: true }, { visible: 'false' });
    }).should.throw(Error);
  });

  it('throws when one of the value types from options does not match', function() {
    (function() {
      enforce({ visible: 'false' }, { visible: true });
    }).should.throw(Error);
  });

  it('silently returns if one of the objects is empty', function() {
    (function() {
      enforce({}, { visible: true });
    }).should.not.throw(Error);
  });

  it('silently returns if one of the corresponding options values is null', function() {
    (function() {
      enforce({ visible: null }, { visible: true });
    }).should.not.throw(Error);
  });

  it('silently returns if one of the corresponding values is absent', function() {
    (function() {
      enforce({ color: 'blue' }, { visible: true });
    }).should.not.throw(Error);
  });
});
