describe('Navigation to conteúdos', () => {
    it('should navigate to the conteúdos page', () => {
        cy.visit('/posts')
        cy.get('a[href*="posts"]').click()
        cy.url().should('include', '/posts')
    });

    it('should navigate to the sobre page', () => {
        cy.visit('/posts')
        cy.get('a[href*="sobre"]').click()
        cy.url().should('include', '/sobre')
    })
});
