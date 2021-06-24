/// <reference types="Cypress"/>

describe('Advance Feature', () => {
    before(() => {
    })

    beforeEach(() => {
        // cy.visit('https://demo.opencart.com/index.php')
        cy.fixture("cart").as('cartDataMobiles')
        cy.visit(Cypress.env('url') + '/index.php')
    })

    it('Mobile buy', () => {
        cy.get('@cartDataMobiles').then(($cartDataMobiles) => {
            $cartDataMobiles.mobiles.forEach(mobileData => {
                cy.addElementToCart(mobileData.name)
            });
            cy.get('#cart').click()
            $cartDataMobiles.mobiles.forEach(mobileData => {
                cy.checkElementToCart(mobileData.name)
            })
        })
    })

    it('Check total amount', () => {
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.get('@cartDataMobiles').then(($cartDataMobiles) => {
            $cartDataMobiles.mobiles.forEach(mobileData => {
                cy.addElementToCart(mobileData.name)
            })

            cy.get('.btn-inverse').click()

            $cartDataMobiles.mobiles.forEach(mobileData => {
                cy.checkElementToCart(mobileData.name)
            })

            var amount = 0

            cy.get("tr:has(button) td:contains('$')").each(($el) => {
                const monto = $el.text()
                var price = monto.replace('$', '')
                amount = Number(amount) + Number(price)
                cy.log("La suma es: " + amount)
            })

            cy.get(".table.table-bordered :nth-child(4) :contains('$')").then(function ($el) {
                const monto = $el.text()
                var total = monto.replace('$', '')
                expect(Number(total)).to.equal(Number(amount))
            })
        })
    })
})