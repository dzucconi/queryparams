var queryparams = require('../../lib/index');

describe('queryparams', function() {
  it('parses the query string', function() {
    queryparams('foo=bar').should.eql({ foo: 'bar' });
  });

  it('parses more complex query strings', function() {
    queryparams('foo[]=bar&foo[]=baz&bar=foo')
      .should.eql({ foo: [ 'bar', 'baz' ], bar: 'foo' });
  });

  describe('with type coercion', function() {
    it('coerces the types', function() {
      queryparams('size=55&color=blue&public=false')
        .should.eql({ size: 55, color: 'blue', public: false });
    });
  });

  describe('with defaults', function() {
    it('sets defaults', function() {
      queryparams('speed=50', { color: 'blue', speed: 25 })
        .should.eql({ color: 'blue', speed: 50 });
    });
  });
});
