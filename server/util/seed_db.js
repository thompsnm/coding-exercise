var db = require('../models/db');

db.connection.sync({ force: true });