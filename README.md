# express-calendar

Zero-dependency [express] middleware for [Google Calendar] (API v3)

This is meant to be a read-only proxy for the events of a publicly accessible Google Calendar.
Currently, only API key access is supported. OAuth support is not planned.

### Usage

```Shell
npm install express-calendar --save
```

```JavaScript
var express = require('express')
var expressCalendar = require('express-calendar')

var options = {
  calendarId: '<put your calendar ID here>@group.calendar.google.com',
  parameters: {
    key: '<put your API key here>'
  }
}

var app = express()
expressCalendar(app, options)
```

```Shell
curl http://express-calendar.node.js:3000/2016/04/01/
```

```JSON
{
  "items": [
    {
      "id":"klnkbropn11lrjs54qp1ukaqog",
      "summary":"The Rainbow"
    },
    {
      "id":"60gmq65c60e2tcodiiabpjmdqc",
      "summary":"The Jets"
    },
    {
      "id":"mh8d5b0avsoa8q3r0luu50626c",
      "summary":"The Sharks"
    }
  ],
  "dateRange": [
    "2016-04-01T00:00:00.000Z",
    "2016-04-02T00:00:00.000Z"
  ]
}
```

See also the [example].

### Options

* `calendarId`: ID of your Google Calendar, typically `something@group.calendar.google.com` (**required**)
* `parameters`: anything that can be passed to [calendar.events.list], e.g.
  * `key`: your Google API key (**required**)
  * `fields`: fields to include in response
* `templates`: mapping from MIME types (may be [canonicalized]) to functions which transform the JSON response to the desired output (see [example])

[calendar.events.list]: https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.events.list
[canonicalized]: http://expressjs.com/en/4x/api.html#res.format
[example]: example
[express]: http://expressjs.com/
[Google Calendar]: https://calendar.google.com/
