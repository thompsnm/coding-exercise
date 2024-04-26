const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const db = require('./models/db');
const qs = require('qs');
const { INTEGER } = require('sequelize');
const bodyParser = require('body-parser')

// Serve any static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse query parameters
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

app.put('/api/campaigns', async (req, res) => {
    try {
        // Unfortunately the initial DB insertion method I chose manually sets IDs
        // in order to ensure they exactly match the seed data, which
        // does not trigger the autoincrement tracking of the id in PostgreSQL.
        // This query lets me calculate the correct next ID to specify.
        // I'm going with this for now, but if I were to seed a DB
        // in a work environment I would look for a method that
        // uses the built in autoincrement feature.
        const maxId = await db.Campaign.max('id');

        const campaign = await db.Campaign.create({
            id: maxId + 1,
            name: req.body.name
        });

        let campaigns = await db.Campaign.findAll();
        res.send(campaigns);
    } catch (e) {
        console.log(e.original);
        res.status(400).send(e.original.detail);
    }
});

app.get('/api/campaign/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Campaign id must be a number");
    }

    let campaign = await db.Campaign.findOne({
        where: { id: req.params.id }
    });
    const status = campaign !== null ? 200 : 404;

    res.status(status).send(campaign);
});

app.get('/api/campaign/:id/invoice', async (req, res) => {
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Campaign id must be a number");
    }

    let ads = await db.Ad.findAll({ where: { campaign_id: req.params.id} });
    if (ads.length === 0) {
        return res.status(404).send({});
    }

    const invoice = {
        campaign_id: req.params.id,
        booked_amount: 0,
        actual_amount: 0,
        adjustments: 0,
    }

    // Important: JS does NOT support exact decimals with the precision necessary for arithmetic operations
    // across numbers in the seed data set
    //
    // Based on some spot checking, it appears Node is able to ingest the data correctly from the seed
    // .json file, persist that to the database, and then recover it from the database. However, numbers
    // with precision greater than 16 appear to be rounded during addition.
    ads.forEach((ad) => {
        invoice.booked_amount += parseFloat(ad.booked_amount);
        invoice.actual_amount += parseFloat(ad.actual_amount);
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

app.put('/api/ads', async (req, res) => {
    try {
        // Unfortunately the initial DB insertion method I chose manually sets IDs
        // in order to ensure they exactly match the seed data, which
        // does not trigger the autoincrement tracking of the id in PostgreSQL.
        // This query lets me calculate the correct next ID to specify.
        // I'm going with this for now, but if I were to seed a DB
        // in a work environment I would look for a method that
        // uses the built in autoincrement feature.
        const maxId = await db.Ad.max('id');

        const ad = await db.Ad.create({
            id: maxId + 1,
            name: req.body.name,
            campaign_id: req.body.campaign_id,
            booked_amount: req.body.booked_amount,
            actual_amount: req.body.actual_amount,
            adjustments: req.body.adjustments,
        });

        let ads = await db.Ad.findAll();
        res.send(ads);
    } catch (e) {
        console.log(e.original);
        res.status(400).send(e.original.detail);
    }
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

app.post('/api/ad/:id', async (req, res) => {
    if (isNaN(parseInt(req.params.id, 10))) {
        return res.status(400).send("Ad id must be a number")
    }

    if (isNaN(parseFloat(req.body.adjustments))) {
        return res.status(400).send("Adjustments must be a number")
    }

    let ad = await db.Ad.findOne({
        where: { id: req.params.id }
    });

    if (ad !== null) {
        await ad.update({ adjustments: req.body.adjustments });
        res.status(200).send(ad);
    } else {
        res.status(404).send(ad);
    }
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));