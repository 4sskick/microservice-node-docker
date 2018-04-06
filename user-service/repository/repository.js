//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

//import
var mysql = require('mysql');

//variables
var ErrorReason = "must be specified";
//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.connection.query('select email, phone_number from directory', (err, result) => {
                if (err)
                    return reject(new Error("An error occured getting the users: " + err));

                resolve((result || []).map((user) => {
                    return {
                        email: user.email,
                        phone_number: user.phone_number
                    };
                }));
            });
        });
    }

    getUserbyEmail(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('select email, phone_number from directory where email = ?', [email], (err, result) => {
                if (err)
                    return reject(new Error("An error occured getting the user by email: " + err));

                if (result.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        email: result[0].email,
                        phone_number: result[0].phone_number
                    });
                }
            });
        });
    }

    disconnection() {
        this.connection.end();
    }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionConfig) => {
    return new Promise((resolve, reject) => {
        if (!connectionConfig.host) throw new Error(`A HOST ${ErrorReason}`);
        if (!connectionConfig.user) throw new Error(`A USER ${ErrorReason}`);
        if (!connectionConfig.password) throw new Error(`A PASSWORD ${ErrorReason}`);
        if (!connectionConfig.port) throw new Error(`A PORT ${ErrorReason}`);

        resolve(new Repository(mysql.createConnection(connectionConfig)));
    })
}