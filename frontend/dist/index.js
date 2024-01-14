var http = require('http');
var Static = require('node-static');

// обычный сервер (статика) на порту 8081
var port = 8081
var fileServer = new Static.Server('./dist');
console.log('server listens to port ' + port)
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(port);
