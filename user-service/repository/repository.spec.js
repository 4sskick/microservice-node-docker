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
                database: 'node-demo-user',
                user: 'root',
                password: 'root',
                port: 3306
            }).should.be.rejectedWith(/host/),

            repository.connect({
                host: '127.0.0.1',
                database: 'node-demo-user',
                // user: 'root',
                password: 'root',
                port: 3306
            }).should.be.rejectedWith(/user/),

            repository.connect({
                host: '127.0.0.1',
                database: 'node-demo-user',
                user: 'root',
                // password: 'root',
                port: 3306
            }).should.be.rejectedWith(/password/),

            repository.connect({
                host: '127.0.0.1',
                database: 'node-demo-user',
                user: 'root',
                password: 'root',
                // port: 3306
            }).should.be.rejectedWith(/port/)
        ])
    });

    it('Should return ok', () => {
        return Promise.all([
            repository.connect({
                host: 'localhost',
                user: 'root',
                password: 'root',
                port: 3306
            }).should.be.resolved()
        ])
    })
});