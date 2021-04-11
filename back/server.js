const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const passport = require('passport');


require('./passport/passport')(passport);

var mongoUtil = require('./database/config-db');

mongoUtil.connectToServer( function( err, client ) {
  if (err)
    console.log(err);


    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Signature');

        // intercept OPTIONS method
        if ('OPTIONS' === req.method) {
        res.sendStatus(200);
        } else {
        next();
        }
    };
    app.use(passport.initialize());
    app.use(allowCrossDomain);

    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/', require('./routes/index')({
        passport: passport,
        router: express.Router()
    }));
});



app.listen(3000, function() {
    console.log('listening on 3000')
})