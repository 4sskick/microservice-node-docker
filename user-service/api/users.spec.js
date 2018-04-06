var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('User API', () => {
    var app = null;

    var testUser = [{
        email: 'homer@thesimpsons.com',
        phone_number: '+1 234 5678'
    }, {
        email: 'marge@thesimpsons.com',
        phone_number: '+1 234 5679'
    }];

    var testRepo = {
        getUsers: () => {
            return Promise.resolve(testUser);
        },
        getUserbyEmail: (email) => {
            return Promise.resolve(testUser.find((user) => {
                return user.email === email;
            }));
        }
    };

    beforeEach(() => {
        return server.start({
            port: 5432,
            repository: testRepo
        }).then((svr) => {
            app = svr;
        });
    });

    afterEach(() => {
        app.close();
        app = null;
    });

    it('Should return all users and status code 200', (done) => {
        request(app)
            .get('/users')
            .expect((res) => {
                res.body.should.containEql({
                    email: 'homer@thesimpsons.com',
                    phoneNumber: '+1 234 5678'
                });
                res.body.should.containEql({
                    email: 'marge@thesimpsons.com',
                    phoneNumber: '+1 234 5679'
                });
            }).expect(200, done)
    });

    it('Should return status code 400', (done) => {
        request(app)
            .get('/search?email=septian.adi@tapestrix.net')
            .expect(400, done);
    });

    it('Should return status code 200', (done) => {
        request(app)
            .get('/search?email=homer@thesimpsons.com')
            .expect(200, done);
    });
});