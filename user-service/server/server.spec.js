var request = require('supertest');
var should = require('should');
var server = require('./server');

describe("Server connection", () => {
    it('should require port to start', () => {
        return server.start({
            repository: {}
        }).should.be.rejectedWith(/port/)
    });

    it('should require repository to start', () => {
        return server.start({
            port: {}
        }).should.be.rejectedWith(/port/)
    });
});