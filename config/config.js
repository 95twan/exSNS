require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: process.env.SEQUELIZE_PASSWORD,
        database: 'nodeSNS',
        host: process.env.RDS_HOST,
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