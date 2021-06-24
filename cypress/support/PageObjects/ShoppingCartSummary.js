class ShoppingCartSummary
{
    getProductNameText()
    {
        return cy.get('tr[id^="product_"]').find('.product-name > a')
    }
    getProductPriceText()
    {
        return cy.get('tr[id^="product_"]').find('.price')
    }
    getProceedToCheckoutButton()
    {
        return cy.get('.btn.standard-checkout')
    }
}
export default ShoppingCartSummary;