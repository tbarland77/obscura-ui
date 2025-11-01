import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

describe("App", () => {
	it("Renders the home page with story cards", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>,
		);
		expect(
			screen.getByLabelText("Story titled The Midnight Garden"),
		).toBeInTheDocument();
	});
});
