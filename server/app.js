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

app.get('/lineItems', async (req, res) => {
    let clause =
        !!req.query.campaign_id
        ? { where: { campaign_id: req.query.campaign_id} }
        : {};

    let lineItems = await db.LineItem.findAll(clause);
    res.send(lineItems);
});

app.get('/lineItem/:id', async (req, res) => {
    let lineItems = await db.LineItem.findOne({
        where: { id: req.params.id }
    });

    if (lineItems === null) {
        res.status(404).send("Line Item not found with id: " + req.params.id);
    } else {
        res.send(lineItems);
    }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));