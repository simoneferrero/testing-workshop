import { within } from '@testing-library/react'

import Todos from './index'

describe('Given <Todos />', () => {
	const renderComponent = () => {
		const renderedComponent = render(<Todos />)
		const {
			getAllByTestId,
			getByLabelText,
			getByPlaceholderText,
			getByTestId,
			getByText,
		} = renderedComponent

		return {
			...renderedComponent,
			getAddTodoButton: () => getByText(/ADD/i),
			getAddTodoInput: () => getByPlaceholderText(/Add TODO/i),
			getAllTodos: () => getAllByTestId(/(todo-)/i),
			getShowCompletedCheckbox: () => getByLabelText(/(Show Completed:)/i),
			getTodo: (text) => within(getByTestId('paper')).getByText(text),
			getWrapper: () => getByTestId('todos'),
		}
	}
	it('should render correctly', () => {
		const {
			container,
			getAddTodoButton,
			getAddTodoInput,
			getShowCompletedCheckbox,
			getWrapper,
		} = renderComponent()

		expect(container.firstChild).toMatchSnapshot()
		expect(getWrapper()).toBeInTheDocument()
		expect(getAddTodoInput()).toBeInTheDocument()
		expect(getAddTodoButton()).toBeInTheDocument()
		expect(getShowCompletedCheckbox()).toBeInTheDocument()
	})

	it('should correctly add new todos and mark them complete', () => {
		const todos = ['First todo', 'Second todo']
		const {
			getAllTodos,
			getAddTodoButton,
			getAddTodoInput,
			getTodo,
		} = renderComponent()

		todos.forEach((todo) => {
			userEvent.type(getAddTodoInput(), todo)
			userEvent.click(getAddTodoButton())

			const renderedTodo = getTodo(todo)

			expect(renderedTodo).toBeInTheDocument()
			expect(renderedTodo).not.toHaveStyle('color: #808080;')
			expect(renderedTodo).not.toHaveStyle('text-decoration: line-through;')
		})

		expect(getAllTodos().length).toBe(todos.length)

		const completedTodo = getTodo(todos[0])

		userEvent.click(completedTodo)

		expect(completedTodo).toHaveStyle('color: #808080;')
		expect(completedTodo).toHaveStyle('text-decoration: line-through;')
	})
})
