// Generated by IcedCoffeeScript 1.8.0-e
(function() {
  var createHash, sha512;

  createHash = require('crypto').createHash;

  sha512 = function(x) {
    var h;
    h = createHash('sha512');
    h.update(x);
    return h.digest();
  };

  exports.make_prng = function() {
    var next, pool, prng, state;
    state = sha512("start");
    pool = state;
    next = function(n_bytes) {
      var more, out, split;
      out = Buffer.from('');
      while (out.length < n_bytes) {
        more = n_bytes - out.length;
        if (pool.length === 0) {
          state = sha512(state);
          pool = state;
        }
        split = Math.min(more, pool.length);
        out = Buffer.concat([out, pool.slice(0, split)]);
        pool = pool.slice(split);
      }
      return out;
    };
    prng = function(n_bytes, cb) {
      if (cb != null) {
        return cb(next(n_bytes));
      } else {
        return next(n_bytes);
      }
    };
    prng.reset = function() {
      return state = 0;
    };
    return prng;
  };

}).call(this);