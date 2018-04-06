var express = require('express');
var morgan = require('morgan');

//variables
var errorReason = "A server must be start with";

module.exports.start = (configOption) => {
    return new Promise((resolve, reject) => {
        //make suer you already have repository & port provided
        if (!configOption.repository) throw new Error(`${errorReason} a connected repository`);
        if (!configOption.port) throw new Error(`${errorReason} a specific port`);

        //define core express
        var app = express();
        //middleware
        app.use(morgan('dev'));//only used on `dev` environment

        //add api to the app
        require('../api/users')(app, configOption);

        //start the app by listen to specific port
        var server = app.listen(configOption.port, () => {
            resolve(server);
        });
    });
};