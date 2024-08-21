describe('Test de cypress', { testIsolation: false }, () => {
  // Envio de beforeEach para que se ejecute antes de cada test
  beforeEach(() => {  
    cy.visit('https://automationintesting.online/')
    cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        cy.clearAllCookies();
  })

  // Valida información del hotel
  it('Validar Información del hotel', () => {
    cy.fixture('example').then((data) => {
      cy.ValidarInfoHotel(data.DatosDelHotel)
    })
  })

  // Valida imagen específica
  it('Validar una imagen específica', () => {
    cy.fixture('imagenes').then((dataimagenes) => {
      const idSeleccionado = 2 // ID de la imagen que quieres validar
      cy.validarImagen(dataimagenes, idSeleccionado)
    })
  })

  // Valida descripción del hotel
  it('Validar descripción del hotel', () => {
    cy.fixture('example').then((data) => {
      cy.CompleteP(data.DatosDelHotel.InformacionDelHotel)
    })
  })

  // Valida envío de formulario vacío
  it('Validar envío de form vacío', () => {
    cy.intercept('POST', 'https://automationintesting.online/message/').as('enviodeformvacio')
    cy.log('Envío de form de contacto en blanco...')
    cy.fixture('formValidation').then((data) => {
      cy.validarEnvioFormulario(data.formErrors, '@enviodeformvacio', 400)
    })
  })

  // Valida envío de formulario con datos incorrectos
  it('Validar envío de form con data incorrecta', () => {
    cy.intercept('POST', 'https://automationintesting.online/message/').as('enviodeformincorrecto')
    cy.fixture('formvalidation').then(({ formData, formErrors2 }) => {
      cy.validarFormularioIncorrecto(formData, formErrors2)
      cy.log('Envío de form de contacto con datos incorrectos...')
      cy.validarEnvioFormulario(formErrors2, '@enviodeformincorrecto', 400)
    })
  })

  // Valida envío de formulario con datos correctos
  it('Debería llenar y enviar el formulario correctamente', () => {
    cy.intercept('POST', 'https://automationintesting.online/message/').as('enviodeformcorrecto')
    cy.fixture('formValidation').then((data) => {
      cy.llenarFormulario(data.formdatacorrecta)
      cy.wait('@enviodeformcorrecto').then((interception) => {
        expect(interception.response.statusCode).to.equal(201)
      })
    })
  })

  // Realiza un drag and drop de un elemento a otro
  it('should drag and drop', () => {
      
        cy.get('button').contains('Book this room').click()
        cy.get('button').contains('Next').click()
        cy.get('button').contains('Next').click()
        cy.get(':nth-child(2) > .rbc-row-content > :nth-child(1) > :nth-child(1) > .rbc-button-link').should('be.visible').wait(1000)
        cy.get(':nth-child(2) > .rbc-row-content > :nth-child(1) > :nth-child(1) > .rbc-button-link').should('be.visible').wait(1000)
      cy.dragAndDrop(':nth-child(5) > .rbc-row-bg > :nth-child(1)', ':nth-child(5) > .rbc-row-bg > :nth-child(3)')
      cy.fixture('data').then((data) => {
        cy.llenarYEnviarFormulario(data)  
      cy.get('.col-sm-4 > .btn-outline-primary').click()
    })
})
})