
var express = require('express')
var app = express()

app.set('view engine', 'ejs');
app.set('views', 'templates');

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
  res.render('index', {});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is listening at http://%s:%s', host, port);
});
