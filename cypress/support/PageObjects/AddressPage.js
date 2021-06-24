class AddressPage {
    getProceedToCheckoutButton() {
        return cy.get('button[name="processAddress"]') 
    }
 
}
export default AddressPage;