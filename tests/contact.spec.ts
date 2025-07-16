import { test } from '../pages/pageFixtures';

test.describe('Contact Tests', () => {
    test.beforeEach(async ({ menuPage }) => {
        await menuPage.goto('/');
        await menuPage.selectContact();
    });

    test('Contact fields error messages', async ({ contactPage }) => {
        
        await contactPage.submitForm();
        await contactPage.verifyForenameError('Forename is required');
        await contactPage.verifyEmailError('Email is required');
        await contactPage.verifyMessageError('Message is required');

        await contactPage.fillMandatoryFields('John', 'john@planit.net', 'Hello, this is a test message.');
        await contactPage.verifyThatTheErrorMessagesAreGone();
    
    });

    for(let i = 0; i < 5; i++) {
        test(`Submit feedback number: ${i + 1}`, async ({ contactPage }) => {

            await contactPage.fillMandatoryFields('John', 'john@planit.net', 'Hello, this is a test message.');
            await contactPage.submitForm();

            await contactPage.verifyAlertMessage('Thanks John, we appreciate your feedback.');
        });
    }
});