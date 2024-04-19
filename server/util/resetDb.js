const db = require('../models/db');
const data = require('./placements_teaser_data.json');
const TeaserDataParser = require("./teaserDataParser");

db.connection.sync({ force: true }).then(() => {
    const teaserDataParser = new TeaserDataParser(data);

    const campaignsMap = teaserDataParser.getCampaigns();
    const campaigns = Array.from(campaignsMap.values());
    db.Campaign.bulkCreate(
        campaigns
    );

    const adsMap = teaserDataParser.getAds();
    const ads = Array.from(adsMap.values());
    db.Ad.bulkCreate(
        ads
    );
});