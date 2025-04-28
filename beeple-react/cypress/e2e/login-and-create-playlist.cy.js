describe('login on test account and create playlist', () => {
  it('should succesfully login and create a playlist afterwards, when that happened it should also delete the playlist', () => {
      cy.visit('http://localhost:5173')

      cy.get('#openLogin').click()

      cy.get('#mail_login').type("test@gmail.com")
      cy.get('#pass_login').type("TestAccount123!")
      cy.get('#loginButton').click()

      cy.get('#add-playlist').click();
      cy.get('#playlist_name_input').type("Test playlist")
      cy.get('.send-button').click()


      cy.contains('Test playlist').click()
      cy.get('#deleteBtn').click()
  })
})