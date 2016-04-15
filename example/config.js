var rc = require('rc')

module.exports = rc('express-calendar-example', {
  googleapis: rc('googleapis', {
    auth: {
      apiKey: undefined
    },
    calendar: {
      v3: {
        calendarId: undefined
      }
    }
  }),
  hostname: "localhost",
  port: 3000
})
