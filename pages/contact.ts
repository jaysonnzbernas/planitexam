import { expect, Locator, Page } from "@playwright/test";
import { BasePOM } from "./BasePOM";

export class ContactPage extends BasePOM {
    private forenameField: Locator;
    private emailField: Locator;
    private messageField: Locator;
    private submitButton: Locator;
    private forenameError: Locator;
    private emailError: Locator;
    private messageError: Locator;

    constructor(page: Page) {
        super(page);
        this.forenameField = page.locator('#forename');
        this.emailField = page.locator('#email');
        this.messageField = page.locator('#message');
        this.submitButton = page.locator('.btn-contact');
        this.forenameError = page.locator('#forename-err');
        this.emailError = page.locator('#email-err');
        this.messageError = page.locator('#message-err');
    }

    async fillMandatoryFields(name: string, email: string, message: string) {
        await this.fillInput(this.forenameField, name);
        await this.fillInput(this.emailField, email);
        await this.fillInput(this.messageField, message);
    }

    async submitForm() {
        await this.click(this.submitButton);
    }

    //assertions
    async verifyForenameError(expectedMessage: string) {
        await this.verifyMessage(this.forenameError, expectedMessage);
    }

    async verifyEmailError(expectedMessage: string) {
        await this.verifyMessage(this.emailError, expectedMessage);
    }      
    
    async verifyMessageError(expectedMessage: string) {
        await this.verifyMessage(this.messageError, expectedMessage);
    }

    async verifyThatTheErrorMessagesAreGone(){
        await expect(this.forenameError).toHaveCount(0);
        await expect(this.emailError).toHaveCount(0);
        await expect(this.messageError).toHaveCount(0);
    }
}