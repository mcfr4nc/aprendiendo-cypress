describe('Creación de usuario',{testIsolation: false}, () => {
    it ('Creacion de usuario OK', () => {
    cy.intercept('POST','/api/user').as('userCreador')    
        cy.visit('https://conduit.bondaracademy.com/')
        cy.contains('Sign up').click()


        
        cy.get('[placeholder="Username"]').type('3358PepeFosuna')
        cy.get('[placeholder="Email"]').type('pepefo3358')
        cy.get('[placeholder="Password"]').type('lele++')
        cy.get('.btn').click()
        cy.wait('@userCreado').then( intercept => {
            expect(intercept.response.statusCode).to.equal(201) })
        cy.log('Felicidades son unos clacks, se creo el usuario')    
    })
})