var server = require('./server/server');
var repo = require('./repository/repository');
var config = require('./config/config');

console.log('Connect to the repository DB...');
//log the unhandled exception
process.on('uncaughtException', (err) => {
    console.error(`unhandled exception`, err);
});

process.on('unhandledRejection', (err, promise) => {
    console.error(`unhandled rejection`, err);
});

repo.connect({
    host: config.db.host,
    database: config.db.db_name,
    user: config.db.db_user,
    password: config.db.db_password,
    port: config.db.port
}).then((repo) => {
    console.log(`Already connected, Starting the server`);

    return server.start({
        port: config.port,
        repository: repo
    });
}).then((app) => {
    console.log(`Server started successfully, running on port ${config.port}`);
    app.on('close', () => {
        repo.disconnection();
    });
});