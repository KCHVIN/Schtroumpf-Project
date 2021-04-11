let JwtBearerStrategy = require('passport-http-bearer');

const dotenv = require('dotenv');
dotenv.config();

const decryptJWT = require('../utils/utils').decryptJWT;

module.exports = function (passport) {

    passport.use('bearer', new JwtBearerStrategy(
        function(token, done) {
            try
            {
                const jwt_content = decryptJWT(token);
                const date_seconds = parseInt((Date.now())/1000);

                if(
                    date_seconds >= jwt_content.iat &&
                    date_seconds <= jwt_content.exp
                ){
                    return done(null, {email: jwt_content.schtroumpf_login});
                }else{
                    return done(null, false);
                }
            }
            catch(error)
            {
                console.log("Error while checking JWT --> " + error.message);
                return done(null, false);
            }
        }
    ));
};
