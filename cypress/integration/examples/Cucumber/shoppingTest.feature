Feature: Primer conjunto de casos de prueba de pagina de compras
 
#     Este feature esta siendo adaptado desde un formato de pom hacia cucumber
 
    # Scenario: Crear una compra desde cero
    #     Given el usuario se encuentra en la pagina de compra
    #     And busca un articulo llamado blusa
    #     When agrega una blusa al carrito
    #     Then el valor del articulo es de 27.00 dolares
    #     When finaliza la compra de los articulos
    #     Then el mensaje de orden completada deberia aparecer


Scenario: Implementando casos de backend testing
    Given User at example page cypress
    Then check request GET comment
    Then check POST request comment
    Then check response changes