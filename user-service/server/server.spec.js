var request = require('supertest');
var should = require('should');
var server = require('./server');

describe("Server connection", () => {

    it('Should be throw an Exception Error, if it is not provided by repository or port', () => {
        return Promise.all([
            server.start({
                repository: {}
            }).should.be.rejectedWith(/A server must be start with a specific port/),

            server.start({
                port: {}
            }).should.be.rejectedWith(/A server must be start with a connected repository/),
        ]);
    });
});