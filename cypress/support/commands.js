// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("addElementToCart", (productName) => {
    cy.get('#menu ul a:contains("Phones & PDAs")').click()
    cy.get('div[class="product-thumb"]').as('productContainer')
        .each(($el, index, $list) => {
            cy.get(':has(.caption) h4 a').eq(index).then(function ($el1) {
                let producto = $el1.text()
                cy.log(producto)
                if (producto.includes(productName)) {
                    cy.log('Producto encontrado')
                    cy.get('@productContainer').eq(index).find('button[onclick^="cart.add"]').click()
                    cy.get('.alert.alert-success.alert-dismissible').should('contain.text', productName)
                }
            })
        })
})


Cypress.Commands.add('checkElementToCart', (productName)=>{
    cy.get('tr:has(button[onclick*="cart.remove"]) td[class="text-left"] a')
        .each(($el, index, $list)=>{
            cy.get('td[class="text-left"] a').eq(index).then(($el1)=>{
                let producto = $el1.text()
                cy.log(producto)
                cy.get('tr:has(button[onclick*="cart.remove"])')
                    .should('contain.text', productName)
            })
        })
})