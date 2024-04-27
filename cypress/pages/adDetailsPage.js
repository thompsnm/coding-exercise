export default class AdDetailsPage {
    // Locators:
    adBookedAmountText = '#ad_details_booked_amount';
    adActualAmountText = '#ad_details_actual_amount';
    adAdjustmentsText = '#ad_details_adjustments';
    newAdjustmentInput = '#new_adjustment';
    updateAdjustmentButton = 'button[type="submit"]';

    constructor() {}

    verifyBookedAmountEquals(amount) {
        cy.get(this.adBookedAmountText).should('contain.text', amount);
        return this;
    }

    verifyActualAmountEquals(amount) {
        cy.get(this.adActualAmountText).should('contain.text', amount);
        return this;
    }

    verifyAdjustmentsEquals(amount) {
        cy.get(this.adAdjustmentsText).should('contain.text', amount);
        return this;
    }

    updateAdjustments(value) {
        cy.get(this.newAdjustmentInput).clear().type(value);
        cy.get(this.updateAdjustmentButton).click();
        return this;
    }
}