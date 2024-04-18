const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const db = require('./models/db');

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from Express!' });
});

app.get('/campaigns', async (req, res) => {
    let campaigns = await db.Campaign.findAll();
    res.send(campaigns);
});

app.get('/campaign/:id', async (req, res) => {
    let campaign = await db.Campaign.findOne({
      where: { id: req.params.id }
    });

    if (campaign === null) {
      res.status(404).send("Campaign not found with id: " + req.params.id);
    } else {
      res.send(campaign);
    }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));