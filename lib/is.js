module.exports = {
  empty: function(obj) {
    if (!obj) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },

  null: function(x) {
    return x == null;
  },
};
