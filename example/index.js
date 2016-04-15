var config = require('./config')
var express = require('express')
var expressCalendar = require('..')

var options = {
  calendarId: config.googleapis.calendar.v3.calendarId,
  parameters: {
    key: config.googleapis.auth.apiKey
  }
}

if (!options.parameters.key) {
  throw new Error('Missing Google API key!')
}

if (!options.calendarId) {
  throw new Error('Missing calendarId!')
}

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
