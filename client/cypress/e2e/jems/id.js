//Use this file to export all the ids to the actual suites

const splashGetStartedButton = '#' + 'splash-button';
const mapCard = '#card';

context('Share IDs across all suites', () => {
    // Generating a random userCount value for further verifications.
    module.exports = {
        splashGetStartedButton,
        mapCard
    }
});
