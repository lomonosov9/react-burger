describe('initialize application content', () => {
  it('loads ingredients on counstructor page', () => {
    cy.fillContentAndVisit();

    cy.get(`[data-test='bun']`)  .should("have.length", 2);
    cy.get(`[data-test='sauce']`).should("have.length", 4);
    cy.get(`[data-test='main']`) .should("have.length", 9);
  })
})