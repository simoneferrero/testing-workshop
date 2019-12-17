import App from "./App";

describe("Given <App />", () => {
  it("should render correctly", () => {
    const { getByTestId, getByText } = render(<App />);
    const Header = getByText(/TODO List/i);
    const Todos = getByTestId("todos");

    expect(Header).toBeInTheDocument();
    expect(Todos).toBeInTheDocument();
  });
});
