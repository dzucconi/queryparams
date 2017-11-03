var coerce = require('../../lib/coerce');

describe('coerce', function() {
  it('coerces booleans', function() {
    coerce({ foo: 'true' }).should.eql({ foo: true });
    coerce({ foo: true }).should.eql({ foo: true });
    coerce({ foo: 'false' }).should.eql({ foo: false });
    coerce({ foo: false }).should.eql({ foo: false });
  });

  it('coerces numbers', function() {
    coerce({ foo: '1' }).should.eql({ foo: 1 });
    coerce({ foo: '0' }).should.eql({ foo: 0 });
    coerce({ foo: '1.5' }).should.eql({ foo: 1.5 });
    coerce({ foo: 1 }).should.eql({ foo: 1 });
  });

  it('coerces nulls', function() {
    coerce({ foo: 'null' }).should.eql({ foo: null });
    coerce({ foo: null }).should.eql({ foo: null });
  });

  it('leaves strings alone', function() {
    coerce({ foo: 'hello' }).should.eql({ foo: 'hello' });
  });

  it('coerces arrays of values', function() {
    coerce({ foo: ['1', '1.5', 'hello', 'null', 'true', false, 1]})
      .should.eql({ foo: [1, 1.5, 'hello', null, true, false, 1] })
  });

  it('coerces arrays with a single value', function() {
    coerce({ foo: ['1']})
      .should.eql({ foo: [1] });
  });
});
