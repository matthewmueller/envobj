/**
 * Module Dependencies
 */

var assert = require('assert')
var environment = require('./')

/**
 * Tests
 */

describe('envobj', function() {
  afterEach(function () {
    delete process.env.a
    delete process.env.b
    delete process.env.c
  })

  it('should validate', function() {
    process.env.a = 'a'
    process.env.b = 'b'
    process.env.c = 5

    var env = environment({
      a: String,
      b: String,
      c: Number
    })

    assert.deepEqual(env, {
      a: 'a',
      b: 'b',
      c: 5
    })
  })

  it('should error out if invalid', function() {
    process.env.a = 'a'
    process.env.b = 'b'
    process.env.c = 'c'

    try {
      var env = environment({
        a: String,
        b: String,
        c: Number
      })
    } catch (e) {
      assert.equal(e.message, 'Value of process.env["c"] does not represent a number')
      return
    }

    throw new Error('should not have gotten here')
  })

  it('should error out if env isnt passed in', function() {
    process.env.a = 'a'
    process.env.b = 'b'

    try {
      var env = environment({
        a: String,
        b: String,
        c: Number
      })
    } catch (e) {
      assert.equal(e.message, 'No environment variable named "c"')
      return
    }

    throw new Error('should not have gotten here')
  })

  it('should provide multiple errors', function() {
    process.env.a = 'a'

    try {
      var env = environment({
        a: String,
        b: String,
        c: Number
      })
    } catch (e) {
      assert.equal(e.message, 'No environment variable named "b"; No environment variable named "c"')
      return
    }

    throw new Error('should not have gotten here')
  })

  it('should support defaults', function() {
    process.env.a = 'a'
    process.env.b = 'b'

    var env = environment({
      a: String,
      b: String,
      c: 5
    })

    assert.deepEqual(env, {
      a: 'a',
      b: 'b',
      c: 5
    })
  })

  it('should coerce numbers', function() {
    process.env.a = 'a'
    process.env.b = '5'

    var env = environment({
      a: String,
      b: Number,
    })

    assert.deepEqual(env, {
      a: 'a',
      b: 5,
    })
  })

  it('should coerce booleans', function() {
    process.env.a = 'a'
    process.env.b = 'false'

    var env = environment({
      a: String,
      b: Boolean,
    })

    assert.deepEqual(env, {
      a: 'a',
      b: false,
    })
  })

  it('should also typecheck functions', function(done) {
    var env = environment(boot, {
      a: String,
      b: Boolean
    })

    function boot (obj) {
      assert.equal(obj.a, 'hi')
      assert.equal(obj.b, false)
      done()
    }

    env({
      a: 'hi',
      b: false
    })
  })

  it('should fail when a function is called with wrong types', function(done) {
    var env = environment(boot, {
      a: String,
      b: Boolean
    })

    function boot (obj) {
      assert.equal(obj.a, true)
      assert.equal(obj.b, false)
    }

    try {
      env({
        b: false
      })
    } catch (e) {
      assert.equal(e.message, 'No environment variable named "a"')
      done()
    }
  })
})
