var https = require('https')

module.exports = expressCalendar

function expressCalendar (router, options) {
  router.get('/:year(\\d{4})/', expressCalendarMiddleware)
  router.get('/:year(\\d{4})/:month(\\d{2})/', expressCalendarMiddleware)
  router.get('/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/', expressCalendarMiddleware)

  function expressCalendarMiddleware (req, res, next) {
    fetchEvents(options.calendarId, options.parameters, function (err, result) {
      if (err) {
        return next(err)
      }

      if (result.error) {
        res.status(result.error.code)
      } else {
        result.date = req.params
      }
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
