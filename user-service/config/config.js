module.exports = {
    port: process.env.PORT || 8123,
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        db_name: 'node_demo_user',
        db_user: 'root',
        db_password: 'root',
        port: 3306
    }
};