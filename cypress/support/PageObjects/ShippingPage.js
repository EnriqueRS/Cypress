class ShippingPage {
    getTermsOfServiceCheckbox() {
        return cy.get('#cgv')
    }
 
    getProceedToCheckoutButton() {
        return cy.get('button[name="processCarrier"]')
    }
 
}
export default ShippingPage;