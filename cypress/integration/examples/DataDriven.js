/// <reference types="Cypress"/>

describe('Segundo conjunto de casos de pruebas avanzadas', function () {
    before(() => {
        cy.fixture('example').as('DataJSON').then(($data) => {
            cy.fixture($data.picture).as('picture')
        })
        // cy.fixture('example').then((data) =>{
        //     this.data = data
        // })
    })

    beforeEach(() => {
        cy.visit('https://demoqa.com/automation-practice-form')
    })

    it('Primer formulario utilizando data', () => {
        // cy.get('#firstName').type(this.data.name)
        cy.get('@DataJSON').then(($data) => {
            cy.get('#firstName').type($data.name)
            cy.get('#lastName').type($data.lastname)
            cy.get('#userEmail').type($data.email)
            cy.get(`input[name="gender"][value="${$data.sex}"]`).check({ force: true })
                .should('be.checked')
            cy.get('#userNumber').type($data.telephone)
            cy.get('#dateOfBirthInput').click().then(() => {
                cy.get('.react-datepicker__month-select')
                    .should('be.visible')
                    .select($data.birthDate[0])
                cy.get('.react-datepicker__year-select')
                    .should('be.visible')
                    .select($data.birthDate[1])
                cy.get(`.react-datepicker__day--0${$data.birthDate[2]}`)
                    .should('be.visible')
                    .click()
                cy.get('#dateOfBirthInput')
                    .should('contain.value', $data.birthDate[0].substring(0, 3))
                    .should('contain.value', $data.birthDate[1])
                    .should('contain.value', $data.birthDate[2])
            })
            cy.get('.subjects-auto-complete__value-container').type($data.subject)
            cy.get('div[id^="react-select-"]').click()
            cy.get('.subjects-auto-complete__value-container').should('contain.text', $data.subject)
            $data.hobbies.forEach(hobby => {
                cy.get('#hobbiesWrapper').find('label').contains(hobby).click()
            })
            $data.hobbies.forEach(hobby => {
                cy.get('#hobbiesWrapper').find('label').contains(hobby)
                    .parent().find('input')
                    .should('be.checked')
            })
            cy.log($data.picture)
            cy.get('#uploadPicture').then(($uploadButton) => {
                //Convertir a bas64
                cy.get('@picture').then(($picture) => {
                    const blob = Cypress.Blob.base64StringToBlob($picture, 'imagen/png')

                    const file = new File([blob], $data.picture, { type: 'image/png' })
                    const list = new DataTransfer()

                    list.items.add(file)
                    const myFileList = list.files
                    $uploadButton[0].files = myFileList
                    $uploadButton[0].dispatchEvent(new Event('change', { bubbles: true }))
                })
            })
            cy.get('#currentAddress').type($data.address)
            cy.get('#state').click().find(`div:contains("${$data.state}")[id*='react-select']`)
                .should('be.visible').click()
            cy.get('#city').click().find(`div:contains("${$data.city}")[id*='react-select']`)
                .should('be.visible').click()
            cy.get('#submit').click()
            cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form')
            cy.get('td:contains("Student Name") +td')
                .should('have.text', `${$data.name} ${$data.lastname}`)
            cy.get('td:contains(Student Email) + td')
                .should('have.text', `${$data.email}`)
        })

    })
})