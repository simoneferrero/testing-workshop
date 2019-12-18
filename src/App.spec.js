import App from "./App";

describe("Given <App />", () => {
  it("should render correctly", async () => {
    const { findByTestId, getByText } = render(<App />);
    const Header = getByText(/TODO List/i);
    const Todos = await findByTestId("todos");

    expect(Header).toBeInTheDocument();
    expect(Todos).toBeInTheDocument();
  });
});
