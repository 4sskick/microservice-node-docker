var should = require('should');
var repository = require('./repository');

describe("Repository", () => {
    it('should connect with a promise', () => {
        repository.connect().should.be.a.Promise();
    });

    it('should be throw an exception if it is not created with a host, password, and port', () => {
        return Promise.all([
            repository.connect({
                // host: '127.0.0.1',
                user: 'root',
                password: 'root',
                port: 3306
            }).should.be.rejectedWith(/A HOST must be specified/),

            repository.connect({
                host: '127.0.0.1',
                // user: 'root',
                password: 'root',
                port: 3306
            }).should.be.rejectedWith(/A USER must be specified/),

            repository.connect({
                host: '127.0.0.1',
                user: 'root',
                // password: 'root',
                port: 3306
            }).should.be.rejectedWith(/A PASSWORD must be specified/),

            repository.connect({
                host: '127.0.0.1',
                user: 'root',
                password: 'root',
                // port: 3306
            }).should.be.rejectedWith(/A PORT must be specified/),
        ]);
    });

    it('Should return ok', () => {
        return Promise.all([
            repository.connect({
                host: 'localhost',
                user: 'root',
                password: 'root',
                port: 3306
            }).should.be.resolved()
        ]);
    });
});