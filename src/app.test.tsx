import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
	it("Renders Test App", () => {
		render(<App />);
		expect(screen.getByText("Test App")).toBeInTheDocument();
	});
});
