var express = require('express')
var expressCalendar = require('..')

var app = express()
expressCalendar(app)

module.exports = app
