var app = require('.')
var port = process.env.npm_package_config_port
app.listen(port, function () {
  console.log('Running example on port ' + port + ' ...')
})
