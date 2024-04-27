import InvoiceDetailsPage from "./invoiceDetailsPage";
import AdDetailsPage from "./adDetailsPage";
import RootPage from "./rootPage";

export default class CampaignDetailsPage {
    // Locators:
    adNameInput = '#new_ad_name';
    bookedAmountInput = '#new_ad_booked_amount';
    actualAmountInput = '#new_ad_actual_amount';
    adjustmentsInput = '#new_ad_adjustments';
    createAdButton = 'button[type="submit"]';

    // Transition pages:
    invoiceDetailsPage;
    adDetailsPage;
    rootPage;

    constructor() {}

    createNewAd(adName, bookedAmount, actualAmount, adjustments) {
        cy.get(this.adNameInput).clear().type(adName);
        cy.get(this.bookedAmountInput).clear().type(bookedAmount);
        cy.get(this.actualAmountInput).clear().type(actualAmount);
        cy.get(this.adjustmentsInput).clear().type(adjustments);
        cy.get(this.createAdButton).click();
        cy.window().its('cypress_wait').should('equal', false);

        return this;
    }

    clickAdDetails(adName) {
        cy
            .contains(adName)
            .siblings()
            .contains('a', 'Details')
            .click();
        
        if(!this.adDetailsPage) {
            this.adDetailsPage = new AdDetailsPage();
        }
        return this.adDetailsPage;
    }

    archiveAd(adName) {
        cy
            .contains(adName)
            .siblings()
            .contains('button', 'Archive')
            .click();
        cy.window().its('cypress_wait').should('equal', true);
        cy.window().its('cypress_wait').should('equal', false);
        
        return this;
    }

    clickInvoice() {
        cy.contains('a', 'Invoice').click();

        if(!this.invoiceDetailsPage) {
            this.invoiceDetailsPage = new InvoiceDetailsPage();
        }
        return this.invoiceDetailsPage;
    }

    archiveCampaign() {
        cy
            .contains('button', 'Archive Campaign')
            .click();

        if(!this.rootPage) {
            this.rootPage = new RootPage();
        }

        return this.rootPage;
    }
}