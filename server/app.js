const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const db = require('./models/db');
const qs = require('qs');
const { INTEGER } = require('sequelize');

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
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Id must be of type INTEGER, " + typeof req.params.id + " found.")
    }

    let campaign = await db.Campaign.findOne({
        where: { id: req.params.id }
    });
    const status = campaign !== null ? 200 : 404;

    res.status(status).send(campaign);
});

app.get('/api/campaign/:id/invoice', async (req, res) => {
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Id must be of type INTEGER, " + typeof req.params.id + " found.")
    }

    let ads = await db.Ad.findAll({ where: { campaign_id: req.params.id} });
    if (ads.length === 0) {
        return res.status(404).send({});
    }

    const invoice = {
        campaignId: req.params.id,
        bookedAmount: 0,
        actualAmount: 0,
        adjustments: 0,
    }

    // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
    // across numbers in the seed data set
    //
    // Based on some spot checking, it appears Node is able to ingest the data correctly from the seed
    // .json file, persist that to the database, and then recover it from the database. However, numbers
    // with precision greater than 16 appear to be rounded during addition.
    ads.forEach((ad) => {
        invoice.bookedAmount += parseFloat(ad.booked_amount);
        invoice.actualAmount += parseFloat(ad.actual_amount);
        invoice.adjustments += parseFloat(ad.adjustments);
    });

    res.status(200).send(invoice);
});

app.get('/api/ads', async (req, res) => {
    if (!!req.query.campaign_id && isNaN(parseInt(req.query.campaign_id, 10))) {
        return res.status(400).send("Campaign id must be a number");
    }

    let clause =
        !!req.query.campaign_id
        ? { where: { campaign_id: req.query.campaign_id} }
        : {};

    let ads = await db.Ad.findAll(clause);
    const status = ads.length > 0 ? 200 : 404;

    res.status(status).send(ads);
});

app.get('/api/ad/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Ad id must be a number")
    }

    let ad = await db.Ad.findOne({
        where: { id: req.params.id }
    });
    const status = ad !== null ? 200 : 404;

    res.status(status).send(ad);
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));