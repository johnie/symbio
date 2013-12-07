var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 1337);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res) {
    res.render("home", {
        name: "Symbio", 
        desc: "We love creating web & mobile apps",
        title: "Symbio - We love creating web & mobile apps"
    });
});

app.use(function(req, res, next){
    res.status(404).render('404', {title: "Sorry, page not found"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
