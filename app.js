var express = require('express'),
    http = require('http'),
    path = require('path'),
    nodemailer = require('nodemailer');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 1337);
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
        host : 'smtp.mandrillapp.com',
        port : 587,
        auth: {
            user: 'johnie.hjelm@symbio.com',
            pass: 'dEPPbyhAdDSK_JHAMvGPzw'
        }
    });

    console.log('req.body -> ' + req.body.name + ' <' + req.body.email + '>');

    // setup e-mail data with unicode symbols
    mailOptions = {
        from: req.body.name + ' <' + req.body.email + '>', // sender address
        to: 'johniehjelm@me.com',
        subject: "Symbio Sweden - Contact", // Subject line
        html: req.body.message + "<br /><br /><b>Name:</b><br />" + req.body.name + "<br /><b>Email:</b><br />" + req.body.email
    }

        // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
//        mailOptions.subject = subject;
//        mailOptions.text = text;
//        mailOptions.html = html;

        if(error){
            console.log(error);
            alert(error);
        }else{
            console.log("Message sent: " + response.message);
            alert("Message sent: " + response.message);
        }

	res.render("home");
    });
});

app.use(function(req, res, next){
    res.status(404).render('404', {title: "Symbio - Page not found"});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Symbio is running on http://dev:' + app.get('port'));
});
