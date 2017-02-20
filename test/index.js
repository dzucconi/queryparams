var sinon = require('sinon');
var queryparams = require('../index');

describe('queryparams', function() {
  describe('fn', function() {
    beforeEach(function() {
      sinon.stub(queryparams.__private__, 'querystring')
        .returns('foo=bar');
    });

    afterEach(function() {
      queryparams.__private__.querystring.restore();
    });

    it('parses the query string', function() {
      queryparams().should.eql({ foo: 'bar' });
    });
  });

  describe('schema', function() {
    beforeEach(function() {
      sinon.stub(queryparams.__private__, 'querystring');
    });

    afterEach(function() {
      queryparams.__private__.querystring.restore();
    });

    it('returns the schema once the defaults are set', function() {
      queryparams.schema()
        .should.eql({});

      queryparams({ message: '', amount: 0 });

      queryparams.schema()
        .should.eql({
          message: 'string',
          amount: 'number',
        });
    });
  });

  describe('reconfigure', function() {
    beforeEach(function() {
      sinon.stub(queryparams.__private__, 'querystring');
      sinon.stub(queryparams.__private__, 'redirect');

      queryparams({ message: '', amount: 0 });
    });

    afterEach(function() {
      queryparams.__private__.querystring.restore();
      queryparams.__private__.redirect.restore();
    });

    it('sets the configuration and redirects', function() {
      queryparams.reconfigure({
        message: 'foobar',
        amount: 2.5,
      });

      queryparams.__private__.redirect.args[0][0]
        .should.equal('message=foobar&amount=2.5');
    });

    it('throws an error if the schema does not match', function() {
      (function() {
        queryparams.reconfigure({
          message: 'foobar',
          amount: 'wrong',
        });
      }).should.throw(Error);

      queryparams.__private__.redirect.called
        .should.be.false();
    });
  });

  describe('encode', function() {
    it('returns a valid query string', function() {
      queryparams.encode({
        message: 'foobar',
        amount: 2.5,
      })
        .should.equal('message=foobar&amount=2.5');
    });

    it('throws an error if the schema does not match', function() {
      (function() {
        queryparams.encode({
          message: 'foobar',
          amount: 'wrong',
        });
      }).should.throw(Error);
    });
  });
});
