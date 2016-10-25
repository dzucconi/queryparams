module.exports = function(obj, fn) {
  return Object.keys(obj).reduce(function(memo, key) {
    memo[key] = fn(obj[key]);
    return memo;
  }, {});
};
