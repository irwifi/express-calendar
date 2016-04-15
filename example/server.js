var app = require('.')
var config = require('./config')

app.listen(config.port, config.hostname, function () {
  console.log('Running example on http://' + config.hostname + ':' + config.port + ' ...')
})
