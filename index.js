'use strict'

/**
 * Load local variables
 */

require('localenv')

/**
 * Module Dependencies
 */

let MultiError = require('combine-errors')
let basetype = require('./base-type')
let assign = require('object-assign')
let type = require('component-type')
let envvar = require('envvar')

/**
 * Export `env`
 */

module.exports = function env (fn, envs) {
  if (typeof fn === 'object') return Env(fn)
  return function (obj) {
    assign(process.env, obj || {})
    return fn(Env(envs))
  }
}

/**
 * Env
 */

function Env (envs) {
  envs = envs || {}

  let errors = []
  let out = {}

  for (let env in envs) {
    let value = envs[env]
    let base = basetype(value)
    let action = base || type(value)

    try {
      out[env] = base ? envvar[action](env) : envvar[action](env, value)
    } catch (err) {
      errors.push(err)
    }
  }

  if (errors.length) {
    throw MultiError(errors)
  }

  return out
}
