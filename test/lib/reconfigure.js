var reconfigure = require('../../lib/reconfigure');
var queryparams = require('../../lib/index');

describe('reconfigure', function() {
  it('produces a new querystring given a new set of params', function() {
    var params = {
      visible: true,
      message: [
        ['hello world', 1],
        ['goodbye world', 1],
      ],
    };

    var querystring = reconfigure(params);

    querystring
      .should.equal('visible=true&message%5B0%5D%5B0%5D=hello%20world&message%5B0%5D%5B1%5D=1&message%5B1%5D%5B0%5D=goodbye%20world&message%5B1%5D%5B1%5D=1');

    queryparams(params)
      .should.eql(params);
  });
});
