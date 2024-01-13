var http = require('http');
var Static = require('node-static');

// обычный сервер (статика) на порту 80
var port = 80
var fileServer = new Static.Server('./dist');
console.log('server listens to port ' + port)
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(port);
