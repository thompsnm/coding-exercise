import RootPage from "../pages/rootPage";

describe('Campaign Management', () => {
  it('can add and archive campaigns and ads', () => {
    const newCampaignName = 'Cypress Test Campaign - ' + Math.ceil(Math.random() * 1000000000);
    cy.visit('https://placementsio-coding-exercise-7a69e9cdc6e3.herokuapp.com/');
    //cy.visit('http://localhost:3500/');

    let rootPage = new RootPage();

    let campaignDetailsPage =
      rootPage
        .createNewCampaign(newCampaignName)
        .clickDetails(newCampaignName);

    let invoiceDetailsPage =
      campaignDetailsPage
        .createNewAd('aa', 1, 1, 1)
        .createNewAd('ab', 2, 1, 1)
        .createNewAd('ac', 3, 2, 1)
        .createNewAd('ad', 4, 3, 1)
        .createNewAd('ae', 5, 5, 1)
        .clickInvoice();

    invoiceDetailsPage
      .verifyBookedAmountEquals(15)
      .verifyActualAmountEquals(12)
      .verifyAdjustmentsEquals(5);

    cy.go('back');

    let adDetailsPage = campaignDetailsPage.clickAdDetails('ad');

    adDetailsPage
      .verifyBookedAmountEquals(4)
      .verifyActualAmountEquals(3)
      .verifyAdjustmentsEquals(1)
      .updateAdjustments(6)
      .verifyAdjustmentsEquals(6);

    cy.go('back');

    campaignDetailsPage.clickInvoice();

    invoiceDetailsPage.verifyAdjustmentsEquals(10);

    cy.go('back');

    campaignDetailsPage
      .archiveAd('ae')
      .clickInvoice();

    invoiceDetailsPage.verifyAdjustmentsEquals(9);

    cy.go('back');

    campaignDetailsPage
      .archiveCampaign();

    rootPage
      .verifyCampaignDoesNotExist(newCampaignName);
  })
})