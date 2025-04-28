describe('Register a user and log in to account', () => {
    it('should succesfully register a user and log in afterwards', () => {
        cy.visit('http://localhost:5173')

        cy.get('#openLogin').click()
        cy.get('.switch_button').click();

        cy.get('#name_register').type("endToend")
        cy.get('#email_register').type("end2end@gmail.com")
        cy.get('#pass_register').type("End2EndTest123!")
        cy.get('.send-button').click()
        cy.contains('CLOSE').click()

        cy.get('.Toastify__close-button').click()
        cy.get('#openLogin').click()
        cy.get('.switch_button').click();
        cy.get('#mail_login').type("end2end@gmail.com")
        cy.get('#pass_login').type("End2EndTest123!")
        cy.get('#loginButton').click()
    })
})