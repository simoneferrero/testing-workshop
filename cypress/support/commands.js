Cypress.Commands.add('addTodo', (todoText) => {
	cy.findByPlaceholderText(/add todo/i)
		.type(todoText)
		.findByText(/add/i)
		.click()
})

Cypress.Commands.add('toggleTodo', (todoText) => {
	cy.findByText(todoText).click()
})
