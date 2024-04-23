const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const db = require('./models/db');
const qs = require('qs');

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));
app.set('query parser', function (str) {
    return qs.parse(str);
});

app.get('/api', (req, res) => {
    res.send({ message: 'Hello from Express!' });
});

app.get('/api/campaigns', async (req, res) => {
    let campaigns = await db.Campaign.findAll();
    res.send(campaigns);
});

app.get('/api/campaign/:id', async (req, res) => {
    let campaign = await db.Campaign.findOne({
        where: { id: req.params.id }
    });

    if (campaign === null) {
        res.status(404).send("Campaign not found with id: " + req.params.id);
    } else {
        res.send(campaign);
    }
});

app.get('/api/ads', async (req, res) => {
    let clause =
        !!req.query.campaign_id
        ? { where: { campaign_id: req.query.campaign_id} }
        : {};

    let ads = await db.Ad.findAll(clause);
    res.send(ads);
});

app.get('/api/ad/:id', async (req, res) => {
    let ads = await db.Ad.findOne({
        where: { id: req.params.id }
    });

    if (ads === null) {
        res.status(404).send("Line Item not found with id: " + req.params.id);
    } else {
        res.send(ads);
    }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));