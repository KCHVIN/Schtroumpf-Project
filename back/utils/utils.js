const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
var ObjectId = require('mongodb').ObjectId;

dotenv.config();

function getJWTKey() {
        let date = new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"});
        date = new Date(date);

        if(date.getHours() < 5){
            date.setDate(date.getDate() - 1);
        }

        return (process.env.JWT_KEY+date.getFullYear()+"-"+date.getMonth()+"_"+date.getDate());
}

function decryptJWT(token) {
        let date = new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"});
        date = new Date(date);

        if(date.getHours() < 5){
            date.setDate(date.getDate() - 1);
        }

        try
        {
            return jwt.verify(token, process.env.JWT_KEY+date.getFullYear()+"-"+date.getMonth()+"_"+date.getDate());
        }
        catch(error)
        {
            date.setDate(date.getDate() - 1);
            return jwt.verify(token, process.env.JWT_KEY+date.getFullYear()+"-"+date.getMonth()+"_"+date.getDate());
        }
    }

function getHMACKey()
{
        return process.env.HMAC_KEY;
}

function getEncryptDecryptKey()
{
        return process.env.ENCRYPT_DECRYPT_KEY;
}

function convertIdInHexa(id)
{
    var re = /[0-9A-Fa-f]{6}/g;
    var Id;

    if(re.test(id))
    {
        Id = ObjectId(id);
    }
    else
    {
        Id = id;
    }
    return Id;
}

module.exports = {
        getJWTKey,
        getHMACKey,
        decryptJWT,
        getEncryptDecryptKey,
        convertIdInHexa
};