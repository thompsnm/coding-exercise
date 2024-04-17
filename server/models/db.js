var Sequelize = require('sequelize');

var db_config = {
    user:     process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host:     process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME
};

var sequelize = new Sequelize(
    db_config.database,
    db_config.user,
    db_config.password,
    {
        host: db_config.host,
        dialect: 'postgres',
        native: true,
        timezone: 'America/Denver'
    }
);

sequelize.define(
    'Campaign',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        }
    }
);

sequelize.define(
    'LineItem',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        booked_amount: {
            // JS does not support exact decimals with the precision necessary for example data set
            // Using string instead to maintain precision
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.STRING(31)
        },
        actual_amount: {
            // JS does not support exact decimals with the precision necessary for example data set
            // Using string instead to maintain precision
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.STRING(31)
        },
        adjustments: {
            // JS does not support exact decimals with the precision necessary for example data set
            // Using string instead to maintain precision
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.STRING(31)
        }
    }
);

module.exports = {
    connection: sequelize,
};