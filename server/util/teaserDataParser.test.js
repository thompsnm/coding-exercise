const TeaserDataParser = require('./teaserDataParser');

describe('TeaserDataParser', () => {
    const adOne =
        {
            "id": 1,
            "campaign_id": 1,
            "campaign_name": "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550",
            "line_item_name": "Awesome Plastic Car - 6475",
            "booked_amount": 430706.6871532752,
            "actual_amount": 401966.50504006835,
            "adjustments": 1311.0731142230268
        };

    const adTwo =
        {
            "id": 10000,
            "campaign_id": 419,
            "campaign_name": "Larkin, Reynolds and Ritchie : Enterprise-wide 3rd generation success - e8d6",
            "line_item_name": "Intelligent Steel Shirt - 2d19",
            "booked_amount": 105243.85945259563,
            "actual_amount": 93659.54567461848,
            "adjustments": 4368.184346036311
        };

    const adThree =
        {
            "id": 9999,
            "campaign_id": 419,
            "campaign_name": "Larkin, Reynolds and Ritchie : Enterprise-wide 3rd generation success - e8d6",
            "line_item_name": "Intelligent Steel Shirt - 2d19",
            "booked_amount": 105243.85945259563,
            "actual_amount": 93659.54567461848,
            "adjustments": 4368.184346036311
        };

    describe('getCampaigns', () => {
        it('returns an empty Map if no data is provided', () => {
            const teaserDataParser = new TeaserDataParser([]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(0);
        });

        it('returns a Map with a parsed campaign if one is provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(1);
            expect(campaigns.get(adOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
        });

        it('returns a Map with multiple parsed campaigns if multiple are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne,
                adTwo
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(2);
            expect(campaigns.get(adOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
            expect(campaigns.get(adTwo.campaign_id)).toEqual({
                id: 419,
                name: "Larkin, Reynolds and Ritchie : Enterprise-wide 3rd generation success - e8d6",
            });
        });

        it('returns a Map with deduplicated campaigns if multiple of the same are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne,
                adOne
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(1);
            expect(campaigns.get(adOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
        });
    });

    describe('getAds', () => {
        it('returns an empty Map if no data is provided', () => {
            const teaserDataParser = new TeaserDataParser([]);
            const ads = teaserDataParser.getAds();
            expect(ads).toBeInstanceOf(Map);
            expect(ads.size).toEqual(0);
        });

        it('returns a Map with a parsed campaign if one is provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne
            ]);
            const ads = teaserDataParser.getAds();
            expect(ads).toBeInstanceOf(Map);
            expect(ads.size).toEqual(1);
            expect(ads.get(adOne.id)).toEqual({
                id: 1,
                campaign_id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
        });

        it('returns a Map with multiple parsed line items if multiple are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne,
                adTwo
            ]);
            const ads = teaserDataParser.getAds();
            expect(ads).toBeInstanceOf(Map);
            expect(ads.size).toEqual(2);
            expect(ads.get(adOne.id)).toEqual({
                id: 1,
                campaign_id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
            expect(ads.get(adTwo.id)).toEqual({
                id: 10000,
                campaign_id: 419,
                actual_amount: 93659.54567461848,
                adjustments: 4368.184346036311,
                booked_amount: 105243.85945259563,
                name: "Intelligent Steel Shirt - 2d19",
            });
        });

        it('returns a Map with deduplicated line items if multiple of the same are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                adOne,
                adOne
            ]);
            const ads = teaserDataParser.getAds();
            expect(ads).toBeInstanceOf(Map);
            expect(ads.size).toEqual(1);
            expect(ads.get(adOne.id)).toEqual({
                id: 1,
                campaign_id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
        });

        it('returns a Map with line items intact if multiple are provided with different IDs but the same name', () => {
            const teaserDataParser = new TeaserDataParser([
                adTwo,
                adThree
            ]);
            const ads = teaserDataParser.getAds();
            expect(ads).toBeInstanceOf(Map);
            expect(ads.size).toEqual(2);
            expect(ads.get(adTwo.id)).toEqual({
                id: 10000,
                campaign_id: 419,
                actual_amount: 93659.54567461848,
                adjustments: 4368.184346036311,
                booked_amount: 105243.85945259563,
                name: "Intelligent Steel Shirt - 2d19",
            });
            expect(ads.get(adThree.id)).toEqual({
                id: 9999,
                campaign_id: 419,
                actual_amount: 93659.54567461848,
                adjustments: 4368.184346036311,
                booked_amount: 105243.85945259563,
                name: "Intelligent Steel Shirt - 2d19",
            });
        });
    });
});