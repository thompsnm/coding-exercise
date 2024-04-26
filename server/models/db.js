const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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
    'Campaign_Archive',
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
    'Ad',
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
            type: Sequelize.DECIMAL
        },
        actual_amount: {
            // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
            // across numbers in the seed data set
            //
            // Based on some spot checking, it appears Node will be able to ingest the data correctly from the seed
            // .json file, persist that to the database, and then recover it from the database. However, adding two
            // numbers together will yield innacurate numbers due to rounding errors.
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.DECIMAL
        },
        adjustments: {
            // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
            // across numbers in the seed data set
            //
            // Based on some spot checking, it appears Node will be able to ingest the data correctly from the seed
            // .json file, persist that to the database, and then recover it from the database. However, adding two
            // numbers together will yield innacurate numbers due to rounding errors.
            // Ref: https://sequelize.org/docs/v7/models/data-types/#exact-decimal-numbers
            type: Sequelize.DECIMAL
        }
    }
);

sequelize.define(
    'Ad_Archive',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        campaign_id: {
            type: Sequelize.INTEGER
        },
        booked_amount: {
            type: Sequelize.DECIMAL
        },
        actual_amount: {
            type: Sequelize.DECIMAL
        },
        adjustments: {
            type: Sequelize.DECIMAL
        }
    }
);

module.exports = {
    connection: sequelize,
    Campaign: sequelize.models.Campaign,
    Ad: sequelize.models.Ad,
    Campaign_Archive: sequelize.models.Campaign_Archive,
    Ad_Archive: sequelize.models.Ad_Archive,
};