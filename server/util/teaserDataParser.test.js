const TeaserDataParser = require('./teaserDataParser');

describe('TeaserDataParser', () => {
    const lineItemOne =
        {
            "id": 1,
            "campaign_id": 1,
            "campaign_name": "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550",
            "line_item_name": "Awesome Plastic Car - 6475",
            "booked_amount": 430706.6871532752,
            "actual_amount": 401966.50504006835,
            "adjustments": 1311.0731142230268
        };

    const lineItemTwo =
        {
            "id": 10000,
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
                lineItemOne
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(1);
            expect(campaigns.get(lineItemOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
        });

        it('returns a Map with multiple parsed campaigns if multiple are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                lineItemOne,
                lineItemTwo
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(2);
            expect(campaigns.get(lineItemOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
            expect(campaigns.get(lineItemTwo.campaign_id)).toEqual({
                id: 419,
                name: "Larkin, Reynolds and Ritchie : Enterprise-wide 3rd generation success - e8d6",
            });
        });

        it('returns a Map with deduplicated campaigns if multiple of the same are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                lineItemOne,
                lineItemOne
            ]);
            const campaigns = teaserDataParser.getCampaigns();
            expect(campaigns).toBeInstanceOf(Map);
            expect(campaigns.size).toEqual(1);
            expect(campaigns.get(lineItemOne.campaign_id)).toEqual({
                id: 1,
                name: "Satterfield-Turcotte : Multi-channelled next generation analyzer - e550"
            });
        });
    });

    describe('getLineItems', () => {
        it('returns an empty Map if no data is provided', () => {
            const teaserDataParser = new TeaserDataParser([]);
            const lineItems = teaserDataParser.getLineItems();
            expect(lineItems).toBeInstanceOf(Map);
            expect(lineItems.size).toEqual(0);
        });

        it('returns a Map with a parsed campaign if one is provided', () => {
            const teaserDataParser = new TeaserDataParser([
                lineItemOne
            ]);
            const lineItems = teaserDataParser.getLineItems();
            expect(lineItems).toBeInstanceOf(Map);
            expect(lineItems.size).toEqual(1);
            expect(lineItems.get(lineItemOne.id)).toEqual({
                id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
        });

        it('returns a Map with multiple parsed line items if multiple are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                lineItemOne,
                lineItemTwo
            ]);
            const lineItems = teaserDataParser.getLineItems();
            expect(lineItems).toBeInstanceOf(Map);
            expect(lineItems.size).toEqual(2);
            expect(lineItems.get(lineItemOne.id)).toEqual({
                id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
            expect(lineItems.get(lineItemTwo.id)).toEqual({
                id: 10000,
                actual_amount: 93659.54567461848,
                adjustments: 4368.184346036311,
                booked_amount: 105243.85945259563,
                name: "Intelligent Steel Shirt - 2d19",
            });
        });

        it('returns a Map with deduplicated line items if multiple of the same are provided', () => {
            const teaserDataParser = new TeaserDataParser([
                lineItemOne,
                lineItemOne
            ]);
            const lineItems = teaserDataParser.getLineItems();
            expect(lineItems).toBeInstanceOf(Map);
            expect(lineItems.size).toEqual(1);
            expect(lineItems.get(lineItemOne.id)).toEqual({
                id: 1,
                actual_amount: 401966.50504006835,
                adjustments: 1311.0731142230268,
                booked_amount: 430706.6871532752,
                name: "Awesome Plastic Car - 6475",
            });
        });
    });
});