'use strict';

// Declare internals

const internals = {};
const Boom = require('boom');
const { AuthToken } = require('./../models/authToken');
const axios = require('axios');
const schedule = require('node-schedule');


// create cronjob to delete old records and public private page for all users with a table.
// modify javascript to send the user token
internals.authenticate_knack = async function (req, res) {
    // return true
    console.log("req.payload.token in knack auth: ", req.payload.token)
    var token = req && req.payload && req.payload.token;
    console.log("token in knack auth: ", token)
    if (!token) {
        console.log("error auth knack token missing")
        return Boom.unauthorized('Knack token is missing!');
    }
    var db_token = await AuthToken.find({ token: token });

    console.log("db token knack auth: ", db_token)
    if (db_token.length == 0) {
        //validate and save token if valid
        try {
            var response = await axios.get(process.env.KNACK_REQUEST_AUTH, {
                headers: {
                    'X-Knack-Application-Id': process.env.KNACK_APP_ID,
                    'X-Knack-REST-API-KEY': 'knack',
                    'Authorization': token
                }
            });
            console.log("valid token")
            console.log("response axios in knack auth: ", response.status, response.statusText)
            await AuthToken.create({ token: token });
            return true;
        } catch (e) {
            if (e.name == "MongoError" && e.code == 11000) {
                console.log("duplicate mongo error: ", e);
                return true
            }
            console.log("error in axios or mongo: ", e)
            return Boom.unauthorized('Invalid Knack token');
        }
    } else {
        //valid token
        return true
    }
}

internals.authenticate_knack_comprehensive = async function (req, res) {
    var token = req && req.payload && req.payload.token;
    if (!token) {
        return Boom.unauthorized('Knack token is missing!');
    }
    var db_token = await AuthToken.find({ token: token });
    if (db_token.length == 0) {
        //validate and save token if valid
        try {
            var response = await axios.get(process.env.KNACK_REQUEST_AUTH_COMPREHENSIVE, {
                headers: {
                    'X-Knack-Application-Id': process.env.KNACK_PROVIDERS_APP_ID,
                    'X-Knack-REST-API-KEY': 'knack',
                    'Authorization': token
                }
            });
            await AuthToken.create({ token: token });
            return true;
        } catch (e) {
            console.log(e)
            return Boom.unauthorized('Invalid Knack token');
        }
    } else {
        //valid token
        return true
    }
}

schedule.scheduleJob('0 0 2 * * *', async function () {
    try {
        var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        // var tokens = await AuthToken.find({create_date: {"$lt":  today}});
        await AuthToken.deleteMany({ create_date: { "$lt": today } });
    } catch (e) {
        console.log(e);
    }
});

exports.plugin = {
    name: 'KnackAuth',
    register: function (server) {

        server.expose('authenticate_knack', internals.authenticate_knack);
        server.expose('authenticate_knack_comprehensive', internals.authenticate_knack_comprehensive);

    }
};
