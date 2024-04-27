import CampaignDetailsPage from "./campaignDetailsPage";

export default class RootPage {
    // Locators:
    campaignNameInput = '#new_campaign_name';
    createCampaignButton = 'button[type="submit"]';

    // Transition pages:
    campaignDetailsPage;

    constructor() {}

    createNewCampaign(campaignName) {
        cy.get(this.campaignNameInput).clear().type(campaignName);
        cy.get(this.createCampaignButton).click();
        return this;
    }

    clickDetails(campaignName) {
        cy
            .contains(campaignName)
            .siblings()
            .contains('a', 'Details')
            .click();
        
        if (!this.campaignDetailsPage) {
            this.campaignDetailsPage = new CampaignDetailsPage();
        }
        return this.campaignDetailsPage;
    }

    verifyCampaignDoesNotExist(campaignName) {
        cy.get(this.campaignNameInput).should('exist');
        cy.contains(campaignName).should('not.exist');
    }
}