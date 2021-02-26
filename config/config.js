require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'nodeSNS',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAliases: false,
    },
    production: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'nodeSNS',
        host: process.env.RDS_HOST,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,
    },
}