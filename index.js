var https = require('https')

module.exports = expressCalendar

function expressCalendar (router, options) {
  router.get('/:date(\\d{4})/', expressCalendarMiddleware)
  router.get('/:date(\\d{4}/\\d{2})/', expressCalendarMiddleware)
  router.get('/:date(\\d{4}/\\d{2}/\\d{2})/', expressCalendarMiddleware)

  function expressCalendarMiddleware (req, res, next) {
    var dateString = req.params.date.replace(/\//g, '-')
    var date = new Date(dateString)
    options.parameters.timeMin = date.toISOString()
    options.parameters.timeMax = new Date(date.valueOf() + 24 * 60 * 60 * 1000).toISOString()

    fetchEvents(options.calendarId, options.parameters, function (err, result) {
      if (err) {
        return next(err)
      }

      if (result.error) {
        res.status(result.error.code)
      }

      result.date = date.toISOString()
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
