var express = require('express')
var expressCalendar = require('..')
var options = require('./options.local.json')

options.parameters.fields = ['items/summary', 'items/id'].join(',')

var app = express()
expressCalendar(app, options)

module.exports = app
