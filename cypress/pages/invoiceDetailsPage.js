export default class InvoiceDetailsPage {
    // Locators:
    invoiceBookedAmountText = '#invoice_details_booked_amount';
    invoiceActualAmountText = '#invoice_details_actual_amount';
    invoiceAdjustmentsText = '#invoice_details_adjustments';

    constructor() {}

    verifyBookedAmountEquals(amount) {
        cy.get(this.invoiceBookedAmountText).should('contain.text', amount);
        return this;
    }

    verifyActualAmountEquals(amount) {
        cy.get(this.invoiceActualAmountText).should('contain.text', amount);
        return this;
    }

    verifyAdjustmentsEquals(amount) {
        cy.get(this.invoiceAdjustmentsText).should('contain.text', amount);
        return this;
    }
}