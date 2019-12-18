import TodoForm from './index'

describe('Given <TodoForm />', () => {
	const handleSubmit = jest.fn()
	const defaultProps = {
		handleSubmit,
	}
	const renderComponent = (props = {}) =>
		render(<TodoForm { ...defaultProps } { ...props } />)

	it('should NOT call submit if the input is empty', () => {
		const { getByText } = renderComponent()

		userEvent.click(getByText(/ADD/i))

		expect(handleSubmit).not.toHaveBeenCalled()
	})

	it('should call submit and reset the input if the input is NOT empty', () => {
		const todo = 'Hello world'
		const { getByPlaceholderText, getByText } = renderComponent()

		userEvent.type(getByPlaceholderText(/Add TODO/i), todo)

		userEvent.click(getByText(/ADD/i))

		expect(handleSubmit).toHaveBeenCalledWith(todo)
		expect(getByPlaceholderText(/Add TODO/i)).toHaveValue('')
	})
})
