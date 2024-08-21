// Comando para importar la librería de drag and drop
require('@4tw/cypress-drag-drop')
// Comando para obtener un párrafo
Cypress.Commands.add('CompleteP', (Paragraph) => {
  cy.get('p').contains(Paragraph)
})

// Comando para validar la información del hotel
Cypress.Commands.add('ValidarInfoHotel', (hotelData) => {
  cy.CompleteP(hotelData.name).should('be.visible')
  cy.CompleteP(hotelData.address).should('be.visible')
  cy.CompleteP(hotelData.phone).should('be.visible')
  cy.CompleteP(hotelData.email).should('be.visible')
})

// Comando para validar las imágenes en la página
Cypress.Commands.add('validarImagen', (imagenesData, idSeleccionado) => {
  imagenesData.ValidarImagenes.forEach((imagen) => {
    if (imagen.id === idSeleccionado) {
      cy.get(imagen.selector).should('be.visible')
    }
  })
})

// Comando para validar el envío de formulario
Cypress.Commands.add('validarEnvioFormulario', (formErrors, alias, expectedStatusCode) => {
  cy.get('#submitContact').click()
  cy.get('.alert').should('be.visible')

  formErrors.forEach((error) => {
    cy.CompleteP(error)
  })

  cy.wait(alias).then((interception) => {
    expect(interception.response.statusCode).to.equal(expectedStatusCode)
  })
})

// Comando para validar el formulario incorrecto
Cypress.Commands.add('validarFormularioIncorrecto', (formData, formErrors) => {
  cy.llenarFormulario(formData)

  formErrors.forEach((error) => {
    cy.contains(error).should('be.visible')
  })
})

// Comando para llenar el formulario
Cypress.Commands.add('llenarFormulario', (data) => {
    cy.get('input[placeholder="Name"]').type(data.name)
    cy.get('input[placeholder="Email"]').type(data.email)
    cy.get('input[placeholder="Phone"]').type(data.phone)
    cy.get('input[placeholder="Subject"]').type(data.subject)
    cy.get('[data-testid="ContactDescription"]').type(data.description)
    cy.get('#submitContact').click()
  })
// Comando para arrastrar y soltar
  Cypress.Commands.add('dragAndDrop', (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => ({
            subject: subject,
            target: target
        })
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 20;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        });
                    cy.get('body')
                        .wait(500)
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true
                        })
                        .wait(500)
                        .trigger('mouseup', {force: true});
                });
        });

});
Cypress.Commands.add('llenarYEnviarFormulario', (data) => {
  cy.get('.col-sm-4 > :nth-child(1) > .form-control').type(data.nombre)
  cy.get('.col-sm-4 > :nth-child(2) > .form-control').type(data.apellido)
  cy.get('.col-sm-4 > :nth-child(3) > .form-control').type(data.email)
  cy.get('.col-sm-4 > :nth-child(4) > .form-control').type(data.mensaje)
})

