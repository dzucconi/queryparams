var queryparams = require('./lib/index');
var schema = require('./lib/schema');
var reconfigure = require('./lib/reconfigure');

var __private__ = {
  querystring: function() {
    return window.location.search.slice(1);
  },

  redirect: function(querystring) {
    window.location.search = '?' + querystring;
  },
};

var fn = function(defaults) {
  fn.defaults = defaults || {};
  fn.options = queryparams(__private__.querystring(), fn.defaults);
  return fn.options;
};

fn.__private__ = __private__;

fn.schema = function() {
  return schema(fn.defaults);
};

fn.reconfigure = function(options) {
  return __private__.redirect(reconfigure(options || {}, fn.defaults));
};

module.exports = fn;
