import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import AddressPage from '../../../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../../../support/PageObjects/AuthenticationPage'
import HomePage from '../../../../support/PageObjects/HomePage'
import PaymentPage from '../../../../support/PageObjects/PaymentPage'
import ShippingPage from '../../../../support/PageObjects/ShippingPage'
import ShoppingSummaryCartPage from '../../../../support/PageObjects/ShoppingCartSummary'
 
const homePage = new HomePage()
const shoppingSummaryCartPage = new ShoppingSummaryCartPage()
const authenticationPage = new AuthenticationPage()
const addressPage = new AddressPage()
const shippingPage = new ShippingPage()
const paymentPage = new PaymentPage()
 
Given('el usuario se encuentra en la pagina de compra', () => {
    // ingresamos a la pagina	 
    cy.visit("http://automationpractice.com/index.php")
})
 
And('busca un articulo llamado blusa', () => {
    homePage.getSearchBox().type('Blouse')
    homePage.getSearchBoxButton().click()
})
 
And('agrega una blusa al carrito', () => {
    homePage.getAddToCartElement("Blouse").click()
    homePage.getProceedToCheckoutButton().click()
})
 
Then('el valor del articulo es de 27.00 dolares', () => {
    shoppingSummaryCartPage.getProductNameText().should('contain.text', 'Blouse')
    shoppingSummaryCartPage.getProductPriceText().should('contain.text', '27.00')
})
 
 
When('finaliza la compra de los articulos', () => {
    shoppingSummaryCartPage.getProceedToCheckoutButton().click()
 
    authenticationPage.getEmailAddressInput().type('cypress@ateneaconocimientos.net')
    authenticationPage.getPasswordInput().type('Atenea')
    authenticationPage.getSignInButton().click()
 
    addressPage.getProceedToCheckoutButton().click()
 
    shippingPage.getTermsOfServiceCheckbox().check().should('be.checked')
    shippingPage.getProceedToCheckoutButton().click()
 
    paymentPage.getPayByBankWireOptionButton().click()
    paymentPage.getIConfirmMyOrderButton().click()
})

Then('el mensaje de orden completada deberia aparecer', () => {
    paymentPage.getDescriptionTitleText().should('have.text', 'Your order on My Store is complete.')
})


Given('User at example page cypress', () =>{
    cy.visit("https://example.cypress.io/commands/network-requests")
})

Then('check request GET comment', () =>{
    cy.intercept('GET', '**/comments/*').as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200,304])
})

Then('check POST request comment', () =>{
    cy.intercept('POST', '**/comments').as('postComment')
    cy.get('.network-post').click()
    cy.wait('@postComment').should(({request,response})=>{
        expect(request.body).to.include('email')
        expect(request.headers).to.have.property('content-type')
        expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
    })
})

Then('check response changes', () =>{
    let msgError = 'Error message'
    cy.intercept({
        method: 'PUT',
        url: '**/comments/*',
    },{
        statusCode: 404,
        body: {error: msgError},
        headers: {'access-control-allow-origin': '*'},
        delayMs: 5000,
    }).as('putComment')
    cy.get('.network-put').click()
    cy.wait('@putComment')
    cy.get('.network-put-comment').should('contain', msgError)
})