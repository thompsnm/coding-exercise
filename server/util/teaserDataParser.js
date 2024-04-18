class TeaserDataParser {
    data;

    constructor(data) {
        this.data = data;
    }

    getCampaigns() {
        let campaigns = new Map();

        for(let datum of this.data) {
            // Map lookups are practically constant time, allowing for efficient comparison and deduplication
            if (!campaigns.has(datum.campaign_id)) {
                campaigns.set(datum.campaign_id, {
                    id: datum.campaign_id,
                    name: datum.campaign_name
                });
            }
        }

        return campaigns;
    }

    getLineItems() {
        let lineItems = new Map();

        for(let datum of this.data) {
            // From a glance through the provided data it does not appear that there is duplication that needs
            // removal but I'm still including a deduplication check as defensive programming as it will not
            // really affect the time complexity of this operation
            if (!lineItems.has(datum.id)) {
                lineItems.set(
                    datum.id,
                    {
                        id: datum.id,
                        name: datum.line_item_name,
                        booked_amount: datum.booked_amount,
                        actual_amount: datum.actual_amount,
                        adjustments: datum.adjustments
                    }
                );
            }
        }

        return lineItems;
    }
}

module.exports = TeaserDataParser;