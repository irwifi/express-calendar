var express = require('express')
var expressCalendar = require('..')
var options = require('./options.local.json')

options.parameters.fields = ['items/summary', 'items/id'].join(',')
options.templates = {
  html: function (result) {
    if (result.error) {
      return result.error.message
    }

    if (result.items.length === 0) {
      return 'No events!'
    }

    var html = '<ul>'
    html += result.items.map(function (event) {
      return '<li>' + event.summary + '</li>'
    }).join('\n')
    html += '</ul>'

    return html
  }
}

var app = express()
expressCalendar(app, options)

module.exports = app
