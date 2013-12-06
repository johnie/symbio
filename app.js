var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 1337);
});

app.get("/", function(req, res) {
    res.render("home.jade", {title: "Symbio - We love creating web & mobile apps"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
