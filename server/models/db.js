const Sequelize = require('sequelize');

const db_config = {
    user:     process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    host:     process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME
};

const sequelize = new Sequelize(
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
            // It turns out there's some data that has a different line item ID but the same name
            // I'm going to assume that that is acceptable experience in the current data configuration
            // but I would double check that with a designer in an actual business setting
            //unique: true
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
    Campaign: sequelize.models.Campaign,
    LineItem: sequelize.models.LineItem
};