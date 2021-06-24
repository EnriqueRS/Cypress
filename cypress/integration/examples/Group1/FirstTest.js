/// <reference types="Cypress"/>

// Import pages Objects
import AddressPage from '../../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../../support/PageObjects/AuthenticationPage'
import HomePage from '../../../support/PageObjects/HomePage'
import PaymentPage from '../../../support/PageObjects/PaymentPage'
import ShippingPage from '../../../support/PageObjects/ShippingPage'
import ShoppingCartSummary from '../../../support/PageObjects/ShoppingCartSummary'


//Suite de casos que contiene cada caso
describe('Primer conjunto de casos de prueba', function () {
    const addressPage = new AddressPage()
    const authenticationPage = new AuthenticationPage()
    const homePage = new HomePage()
    const paymentPage = new PaymentPage()
    const shippingPage = new ShippingPage()
    const shoppingCartSummary = new ShoppingCartSummary()


    beforeEach(() => {
        cy.visit("www.automationpractice.com/index.php")
    })

    //Caso de prueba 2:
    it('Contabilizar elementos en página principal', function () {
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
        cy.get('@ProductosPopulares').should('have.length', 7)
    })
    it('A gregar el elemento de tipo "Printed Dress" al carrito de compra desde la página principal', function () {
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
        cy.get('@ProductosPopulares')
            .find('.product-name')
            .each(($el, index, $list) => {

                cy.get('@ProductosPopulares').eq(index).find('.price').then(function ($price) {
                    let precio = $price.text()
                    cy.log(precio)

                    if ($el.attr('title') === 'Printed Dress' && precio.includes('50.99')) {
                        cy.log('Se ha encontrado el elemento buscado')
                        cy.log('Se ha encontrado el precio buscado')
                        cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
                    }
                })
            })
        cy.get('h2 > .ajax_cart_product_txt')
            .should('contain.text', 'There is 1 item in your cart.')
            .should('be.visible')
    })

    // Caso de prueba 3
    it('Verificar que drop down de women, tenga los elementos', function () {
        // cy.get('#block_top_menu a[title="Women"]').invoke('style', 'display', 'block')
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul')
            .invoke('attr', 'style', 'display: block')
        cy.get('a[title="Tops"]').should('be.visible')
        cy.get('a[title="T-shirts"]').should('be.visible')
        cy.get('a[title="Blouses"]').should('be.visible')
        cy.get('a[title^="Dresses"]').should('be.visible')
        cy.get('a[title^="Evening"]').should('be.visible')
        cy.get('a[title^="Summer"]').should('be.visible')
        // })
    })

    it('Verificar que los checkboxes', function () {
        cy.get('.sf-menu > :nth-child(2) > a').click()
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input')
            .check().should('be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input')
            .should('not.be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input')
            .should('not.be.checked')
    })

    it('Verificar que los dropdowns de arreglo esten funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > a').click()
        cy.get('#selectProductSort').select('In stock').should('have.value', 'quantity:desc')
    })

    //     it('Compra completa', () => {
    //         cy.get('#search_query_top').type("Blouse")
    //         cy.get('#searchbox > .btn').click()
    //         cy.get('.product_list').find('.product-container').each(function ($el, index, $list) {
    //             cy.get('.product_list').eq(index).find('.price').then(function ($price) {
    //                 cy.log($price.text())
    //                 return $price.text()
    //             }).then(($price_text) => {
    //                 cy.get('.product_list').eq(index).find('.product-name').then(function($name){
    //                     cy.log($name.text())

    //                 })
    //             })
    //             // let precio = $price.text()
    //             // cy.log(precio)
    //             // cy.log($el)
    //             // cy.log($el.children('.product-name')[0].attr('title'))
    //             // if ($el.children('.product-name')[0].attr('title') === 'Blouse' && precio.includes('27.00')) {
    //             //     cy.log('Se ha encontrado el elemento buscado')
    //             //     cy.log('Se ha encontrado el precio buscado')
    //             //     cy.get('.product_list').eq(index).contains('Add to cart').click()
    //             // }
    //             // })
    //         })
    //     });

    Cypress.config('defaultCommandTimeout', 1000)
    it('Compra completa', () => {
        homePage.getSearchBox().type('Blouse')
        homePage.getSearchBoxButton().click()
        homePage.getAddToCartElement('Blouse').click()
        homePage.getProceedToCheckoutButton().click({force: true})
        shoppingCartSummary.getProductPriceText().should('contain.text', '27.00')
        shoppingCartSummary.getProductNameText().then(($el) =>{
            let descripcion = $el.text()
            cy.log(descripcion)
            shoppingCartSummary.getProductPriceText().then(($el1) =>{
                var price = $el1.text()
                cy.log(price)
                if(cy.wrap($el).should('have.text', 'Blouse') && price.includes('27.00')){
                    shoppingCartSummary.getProceedToCheckoutButton().click()
                }
            })
        })
        authenticationPage.getEmailAddressInput().type("testcypress@yopmail.com")
        authenticationPage.getPasswordInput().type("12345")
        authenticationPage.getSignInButton().click()
        addressPage.getProceedToCheckoutButton().click()
        shippingPage.getTermsOfServiceCheckbox().check()
        shippingPage.getProceedToCheckoutButton().click()
        paymentPage.getPayByBankWireOptionButton().click()
        paymentPage.getIConfirmMyOrderButton().click()
        paymentPage.getDescriptionTitleText().should('have.text', 'Your order on My Store is complete.')
    })


})


