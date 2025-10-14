import { cleanup, screen } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";
import { mountApp } from "./main"; // now safe to import

beforeEach(() => {
	document.body.innerHTML = '<div id="root"></div>';
});

afterEach(() => {
	cleanup();
	document.body.innerHTML = "";
});

it("mountApp renders the App into the container", async () => {
	const container = document.getElementById("root")!;
	mountApp(container);
	// wait for the app to render and update the DOM
	const heading = await screen.findByText(/Test App/i);
	expect(heading).toBeInTheDocument();
});
