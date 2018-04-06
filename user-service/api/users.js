//export only the route of API the the `app` given `configOption`
'use strict';

module.exports = (app, configOption) => {
    app.get("/", (req, res, next)=>{
        res.status(200).send({
            status:"use GET - /users & GET - /search"
        });
        next();
    });
    app.get("/users", (req, res, next) => {
        configOption.repository.getUsers().then((users) => {
            res.status(200).send(users.map((user) => {
                return {
                    email: user.email,
                    phoneNumber: user.phone_number
                };
            }));
        }).catch(next);
    });

    app.get("/search", (req, res, next) => {
        //get the email
        var email = req.query.email;
        // if (!email) throw new Error(`Email must be specified when searching, e.g: '/search?email=homer@thesimpsons.com'.`);
        if(!email) res.status(401).send({
            status:`Fatal Error, query can not be accepted e.g: '/search?email=homer@thesimpsons.com'`
        });

        //get user from repo
        configOption.repository.getUserbyEmail(email).then((userByEmail) => {
            if (!userByEmail) {
                res.status(400).send({
                    status: `not found`
                });
            } else {
                res.status(200).send({
                    status: `found`,
                    email: userByEmail.email,
                    phoneNumber: userByEmail.phone_number
                });
            }
        }).catch(next);
    });
};