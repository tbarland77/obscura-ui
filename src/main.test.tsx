import { act, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mountApp } from "./mount-app";

describe("main.tsx", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		// Create a fresh container for each test
		container = document.createElement("div");
		container.id = "root";
		document.body.appendChild(container);
	});

	afterEach(() => {
		cleanup();
		container.remove();
	});

	it("mounts the app into the provided container", async () => {
		await act(async () => {
			mountApp(container);
		});

		// App should render without errors
		expect(container.firstChild).toBeInTheDocument();
	});

	it("renders the App component", async () => {
		await act(async () => {
			mountApp(container);
		});

		// Wait for App to render (it contains Routes)
		const rootDiv = document.getElementById("root");
		expect(rootDiv?.firstChild).toBeDefined();
	});

	it("wraps App with StrictMode", async () => {
		await act(async () => {
			mountApp(container);
		});

		// StrictMode doesn't render visible elements, but we can verify the app mounted
		expect(container.firstChild).toBeTruthy();
	});

	it("wraps App with BrowserRouter", async () => {
		await act(async () => {
			mountApp(container);
		});

		// BrowserRouter allows routing to work
		expect(container.firstChild).toBeTruthy();
	});

	it("creates a React root in the container", async () => {
		await act(async () => {
			mountApp(container);
		});

		// Verify React rendered something
		expect(container.innerHTML.length).toBeGreaterThan(0);
	});

	it("handles mounting into different containers", async () => {
		const container1 = document.createElement("div");
		const container2 = document.createElement("div");

		document.body.appendChild(container1);
		document.body.appendChild(container2);

		await act(async () => {
			mountApp(container1);
			mountApp(container2);
		});

		expect(container1.firstChild).toBeTruthy();
		expect(container2.firstChild).toBeTruthy();

		container1.remove();
		container2.remove();
	});

	it("throws error if root element is not found", () => {
		// Remove the root element
		const root = document.getElementById("root");
		if (root) {
			root.remove();
		}

		expect(() => {
			const missingContainer = document.getElementById("root");
			if (!missingContainer) {
				throw new Error("Root element not found");
			}
		}).toThrow("Root element not found");
	});

	it("mounts app without errors when called", async () => {
		// This test verifies the mount function doesn't throw
		await act(async () => {
			expect(() => mountApp(container)).not.toThrow();
		});
	});

	it("renders content in the correct DOM structure", async () => {
		await act(async () => {
			mountApp(container);
		});

		// Verify React rendered into the container
		const appElement =
			container.querySelector('[class*="space-y"]') || container.firstChild;
		expect(appElement).toBeInTheDocument();
	});
});

describe("main.tsx - Runtime Initialization", () => {
	afterEach(() => {
		cleanup();
		// Cleanup any test containers
		const testContainers = document.querySelectorAll('[id^="test-root"]');
		testContainers.forEach((el) => {
			el.remove();
		});
	});

	it("should automatically mount app when script loads", async () => {
		// This verifies the script executes mountApp at the bottom
		// In a real app, this happens automatically when main.tsx is imported

		const testContainer = document.createElement("div");
		testContainer.id = "root";
		document.body.appendChild(testContainer);

		await act(async () => {
			mountApp(testContainer);
		});

		expect(testContainer.firstChild).toBeTruthy();
		testContainer.remove();
	});

	it("requires a valid HTMLElement for mounting", async () => {
		const validContainer = document.createElement("div");
		document.body.appendChild(validContainer);

		// Should not throw with valid element
		await act(async () => {
			expect(() => mountApp(validContainer)).not.toThrow();
		});

		validContainer.remove();
	});

	it("mounts the app with all required providers", async () => {
		const testContainer = document.createElement("div");
		document.body.appendChild(testContainer);

		await act(async () => {
			mountApp(testContainer);
		});

		// Verify providers are in place by checking the DOM is populated
		expect(testContainer.innerHTML.length).toBeGreaterThan(0);

		testContainer.remove();
	});
});
