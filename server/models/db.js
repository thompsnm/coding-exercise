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
        campaign_id: {
            type: Sequelize.INTEGER
        },
        booked_amount: {
            // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
            // across numbers in the seed data set
            //
            // Based on some spot checking, it appears Node will be able to ingest the data correctly from the seed
            // .json file, persist that to the database, and then recover it from the database. However, adding two
            // numbers together will yield innacurate numbers due to rounding errors.
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.DECIMAL(31)
        },
        actual_amount: {
            // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
            // across numbers in the seed data set
            //
            // Based on some spot checking, it appears Node will be able to ingest the data correctly from the seed
            // .json file, persist that to the database, and then recover it from the database. However, adding two
            // numbers together will yield innacurate numbers due to rounding errors.
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.DECIMAL(31)
        },
        adjustments: {
            // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
            // across numbers in the seed data set
            //
            // Based on some spot checking, it appears Node will be able to ingest the data correctly from the seed
            // .json file, persist that to the database, and then recover it from the database. However, adding two
            // numbers together will yield innacurate numbers due to rounding errors.
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.DECIMAL(31)
        }
    }
);

module.exports = {
    connection: sequelize,
    Campaign: sequelize.models.Campaign,
    LineItem: sequelize.models.LineItem
};