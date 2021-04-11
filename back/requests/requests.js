const getJWTKey = require('../utils/utils').getJWTKey;
const getHMACKey = require('../utils/utils').getHMACKey;
const convertIdInHexa = require('../utils/utils').convertIdInHexa;
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

var client = require('../database/config-db');
var db = client.getDb();

async function connexionAccount(req, res)
{
    if (req.body.hasOwnProperty('schtroumpf_login') &&
        req.body.hasOwnProperty('schtroumpf_password'))
        {
            try
            {
                const data = await db.collection('schtroumpf_account').findOne({
                    schtroumpf_login: req.body.schtroumpf_login
                });
                if (data)
                {
                    let hash = CryptoJS.HmacSHA256(JSON.stringify(req.body), req.body.schtroumpf_password+getHMACKey());
                    hash = CryptoJS.enc.Hex.stringify(hash);
                    if (data.schtroumpf_password == hash)
                    {
                        res.status(200).send(
                        {
                            _id: data._id, token: jwt.sign({ "schtroumpf_login": data.schtroumpf_login },
                            getJWTKey(),
                            { algorithm: 'HS256', expiresIn: '18h'})
                        });
                    }
                    else
                    {
                        res.status(401).send({message:"Wrong Password"});
                    }
                }
                else {
                    res.status(401).send({message: "Username doesn't exist"});
                }
            }
            catch(err)
            {
                console.log("ERR --> " + err);
                res.status(401).send({message: "Unauthorized"});
            }
        }
}

async function createAccount(req, res)
{
    if (req.body.hasOwnProperty('schtroumpf_login') &&
        req.body.hasOwnProperty('schtroumpf_password'))
        {
            try
            {

                let hash = CryptoJS.HmacSHA256(
                    JSON.stringify({
                        schtroumpf_login: req.body.schtroumpf_login,
                        schtroumpf_password: req.body.schtroumpf_password
                    }),
                    req.body.schtroumpf_password + getHMACKey()
                );
                hash = CryptoJS.enc.Hex.stringify(hash);
                const data = await db.collection('schtroumpf_account').insertOne(
                    {
                        schtroumpf_login: req.body.schtroumpf_login,
                        schtroumpf_password: hash
                    }
                ).then(result => {
                    const request = {
                        body: {
                            _id: result.insertedId,
                            name: req.body.schtroumpf_login,
                            age: req.body.age,
                            family: req.body.family,
                            race: req.body.race,
                            food: req.body.food,
                            friends: [],
                        }
                    };
                    db.collection('schtroumpf').insertOne(request.body)
                    res.status(200).send({message: hash});
                  })
                  .catch(error => console.error(error))

            }
            catch(err)
            {
                console.log("ERR --> "+err);
                res.status(401).send("Unauthorized");
            }
        }
        else
        {
            console.log("Bad request, the query content is --> " + JSON.stringify(req.body));
            res.status(400).send("Bad Request");
        }
}

async function addFriend(req, res)
{
    var Id = convertIdInHexa(req.params.id);

    try
    {
        const data = await db.collection('schtroumpf').updateOne(
            { _id: Id },
            { $addToSet:{ friends: { $each: [req.body.name]} }}
            ).then(result => {
            res.status(200).send(result);
          })
          .catch(error => console.error(error))
    }
    catch (err)
    {
        console.log("Err --> ", err);
        res.status(500).send({message: "error"});
    }
}

async function getAccounts(req, res)
{
    try
    {
        const data = await db.collection('schtroumpf_account').find().toArray(function(err, result) {
            if (err) {
              throw err;
            }
            res.status(200).send(result);
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function getSchtroumpfs(req, res)
{
    var Id = convertIdInHexa(req.params.schtroumpfId);

    try
    {
        const data = await db.collection('schtroumpf').find({ "_id": { $ne: Id } }).toArray(function(err, result) {
            if (err) {
              throw err;
            }
            res.status(200).send(result);
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function accountInformation(req, res)
{
    var Id = convertIdInHexa(req.params.id);

    try
    {
        const data = await db.collection('schtroumpf').findOne({ "_id": Id }, function(err, result) {
            if (err) {
              throw err;
            }
            res.status(200).send(result);
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function postData(req, res)
{
    try
    {
        const data = await db.collection('schtroumpf').insertOne(req.body)
              .then(result => {
                res.status(200).send(result);
              })
              .catch(error => console.error(error))
    }
    catch(error)
    {
        res.status(500).send("Error");
    }
}

async function updateSchtroumpf(req, res)
{
    if (req.params.id == undefined)
        res.status(500).send("Id not found");
    var Id = convertIdInHexa(req.params.id);

    var newValues = {
        $set:
        {
            age: req.body.age,
            family: req.body.family,
            race: req.body.race,
            food: req.body.food,
        }
    };
    try
    {
        const data = await db.collection('schtroumpf').findOneAndUpdate({_id: Id }, newValues)
              .then(result => {
                res.status(201).send(result);
              })
              .catch(error => console.error(error))

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function removeFriend(req, res)
{
    var Id = convertIdInHexa(req.params.id);

    try
    {
        const data = await db.collection('schtroumpf').updateOne(
            {_id: Id },
            { $pull: { 'friends': req.body.name }}
            )
              .then(result => {
                res.status(202).send({message: "Remove friend Success"});
              })
              .catch(error => console.error(error))

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}

async function deleteData(req, res)
{
    if (req.params.id == undefined)
    {
        res.status(500).send("Id not found");
    }
    var Id = convertIdInHexa(req.params.id);

    try
    {
        const data = await db.collection('schtroumpf').deleteOne({_id: Id })
              .then(result => {
                res.status(202).send("Delete Success");
              })
              .catch(error => console.error(error))

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error");
    }
}
module.exports = {
    getSchtroumpfs,
    postData,
    updateSchtroumpf,
    deleteData,
    connexionAccount,
    createAccount,
    getAccounts,
    addFriend,
    accountInformation,
    removeFriend
};