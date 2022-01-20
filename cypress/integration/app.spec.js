describe('Navigation to conteúdos', () => {
    it('should navigate to the conteúdos page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('a[href*="posts"]').click()
        cy.url().should('include', '/posts')
    })
});
