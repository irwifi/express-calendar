var https = require('https')

module.exports = expressCalendar

function expressCalendar (router, options) {
  router.get('/:date(\\d{4})/', expressCalendarMiddleware)
  router.get('/:date(\\d{4}/\\d{2})/', expressCalendarMiddleware)
  router.get('/:date(\\d{4}/\\d{2}/\\d{2})/', expressCalendarMiddleware)

  function expressCalendarMiddleware (req, res, next) {
    var dateString = req.params.date.replace(/\//g, '-')
    var dateMin = new Date(dateString)
    options.parameters.timeMin = dateMin.toISOString()

    var dateMax = new Date(dateMin.valueOf())
    if (dateString.length === 4) {
      dateMax.setUTCFullYear(dateMax.getUTCFullYear() + 1)
    } else if (dateString.length === 7) {
      dateMax.setUTCMonth(dateMax.getUTCMonth() + 1)
    } else {
      dateMax.setUTCDate(dateMax.getUTCDate() + 1)
    }

    options.parameters.timeMax = dateMax.toISOString()

    fetchEvents(options.calendarId, options.parameters, function (err, result) {
      if (err) {
        return next(err)
      }

      if (result.error) {
        res.status(result.error.code)
      }

      result.dateRange = [dateMin.toISOString(), dateMax.toISOString()]
      res.json(result)
    })
  }
}

function fetchEvents (calendarId, parameters, callback) {
  var parameterString = Object.keys(parameters).map(function (key) {
    return key + '=' + parameters[key]
  }).join('&')

  var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?' + parameterString
  https.get(url, function (calendarResponse) {
    calendarResponse.on('data', function (responseData) {
      var responseDataObject = JSON.parse(responseData.toString())
      callback(null, responseDataObject)
    })
  }).on('error', function (e) {
    callback(e)
  })
}
