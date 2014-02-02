var express     = require('express'),
    config      = require('./config.js'),
    http        = require('http'),
    path        = require('path'),
    nodemailer  = require('nodemailer');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || config.http.port);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(app.router);
    // app.use(express.static(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get("/", function(req, res) {
    res.render("home", {
        name: "Symbio", 
        desc: "We love creating web & mobile apps",
        title: "Symbio - We love creating web & mobile apps"
    });
});

app.post("/contact", function(req, res) {
    var smtpTransport, mailOptions;

    smtpTransport = nodemailer.createTransport("SMTP",{
        host : config.email.host,
        port : 587,
        auth: {
            user: config.email.user,
            pass: config.email.pass
        }
    });

    console.log('req.body -> ' + req.body.name + ' <' + req.body.email + '>');

    // setup e-mail data with unicode symbols
    mailOptions = {
        from: req.body.name + ' <' + req.body.email + '>', // sender address
        to: config.email.to,
        subject: "Symbio Sweden - Contact", // Subject line
        html: req.body.message + "<br /><br /><b>Name:</b><br />" + req.body.name + "<br /><b>Phone:</b>" + req.body.phone + "<br /><b>Email:</b><br />" + req.body.email
    }

        // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){

    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

	res.send(200);
    });
});

app.use(function(req, res, next){
    res.status(404).render('404', {title: "Symbio - Page not found"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Symbio is running on http://dev:' + app.get('port'));
});
