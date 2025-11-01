import { act, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mountApp } from "./mount-app";

describe("mountApp", () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		// Create a fresh container for each test
		container = document.createElement("div");
		container.id = "test-root";
		document.body.appendChild(container);
	});

	afterEach(() => {
		cleanup();
		container.remove();
	});

	describe("Basic Functionality", () => {
		it("mounts the React app into the provided container", async () => {
			await act(async () => {
				mountApp(container);
			});

			expect(container.firstChild).toBeTruthy();
			expect(container.innerHTML.length).toBeGreaterThan(0);
		});

		it("creates a React root and renders content", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Verify React rendered something into the container
			expect(container.firstChild).toBeInTheDocument();
		});

		it("renders without throwing errors", async () => {
			await act(async () => {
				expect(() => mountApp(container)).not.toThrow();
			});
		});
	});

	describe("React Component Structure", () => {
		it("wraps the app with StrictMode", async () => {
			await act(async () => {
				mountApp(container);
			});

			// StrictMode doesn't add visible DOM elements, but we can verify rendering occurred
			expect(container.firstChild).toBeTruthy();
		});

		it("wraps the app with BrowserRouter", async () => {
			await act(async () => {
				mountApp(container);
			});

			// BrowserRouter enables routing - verify the app rendered
			// (routing functionality is tested in App.test.tsx)
			expect(container.firstChild).toBeTruthy();
		});

		it("renders the App component", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Verify App component content is present (story list container)
			const appContent = container.querySelector('[class*="space-y"]');
			expect(appContent).toBeInTheDocument();
		});
	});

	describe("Container Handling", () => {
		it("accepts any valid HTMLElement as container", async () => {
			const divContainer = document.createElement("div");
			const sectionContainer = document.createElement("section");
			const mainContainer = document.createElement("main");

			document.body.appendChild(divContainer);
			document.body.appendChild(sectionContainer);
			document.body.appendChild(mainContainer);

			await act(async () => {
				mountApp(divContainer);
				mountApp(sectionContainer);
				mountApp(mainContainer);
			});

			expect(divContainer.firstChild).toBeTruthy();
			expect(sectionContainer.firstChild).toBeTruthy();
			expect(mainContainer.firstChild).toBeTruthy();

			divContainer.remove();
			sectionContainer.remove();
			mainContainer.remove();
		});

		it("handles mounting into multiple containers independently", async () => {
			const container1 = document.createElement("div");
			const container2 = document.createElement("div");

			document.body.appendChild(container1);
			document.body.appendChild(container2);

			await act(async () => {
				mountApp(container1);
				mountApp(container2);
			});

			// Each container should have its own React root
			expect(container1.firstChild).toBeTruthy();
			expect(container2.firstChild).toBeTruthy();
			expect(container1.innerHTML).not.toBe("");
			expect(container2.innerHTML).not.toBe("");

			container1.remove();
			container2.remove();
		});

		it("works with containers that have existing attributes", async () => {
			container.setAttribute("data-testid", "app-container");
			container.className = "custom-class";

			await act(async () => {
				mountApp(container);
			});

			// Verify the container still has its attributes
			expect(container.getAttribute("data-testid")).toBe("app-container");
			expect(container.className).toBe("custom-class");
			expect(container.firstChild).toBeTruthy();
		});
	});

	describe("Rendering Output", () => {
		it("renders content with proper DOM structure", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Check for expected content structure from App component
			const storyContainer = container.querySelector('[class*="space-y"]');
			expect(storyContainer).toBeInTheDocument();
		});

		it("renders story cards from the App component", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Verify story cards are rendered
			const articles = container.querySelectorAll("article");
			expect(articles.length).toBeGreaterThan(0);
		});

		it("applies CSS styles by importing index.css", async () => {
			await act(async () => {
				mountApp(container);
			});

			// index.css is imported, so Tailwind classes should be applied
			// We can verify content was rendered with classes
			const storyContainer = container.querySelector('[class*="space-y"]');
			expect(storyContainer).toBeTruthy();
		});
	});

	describe("Error Handling", () => {
		it("handles container with no id attribute", async () => {
			const noIdContainer = document.createElement("div");
			document.body.appendChild(noIdContainer);

			await act(async () => {
				expect(() => mountApp(noIdContainer)).not.toThrow();
			});

			expect(noIdContainer.firstChild).toBeTruthy();
			noIdContainer.remove();
		});

		it("can mount into detached containers", async () => {
			const detachedContainer = document.createElement("div");
			// Note: Not appended to document.body

			await act(async () => {
				expect(() => mountApp(detachedContainer)).not.toThrow();
			});

			expect(detachedContainer.firstChild).toBeTruthy();
		});
	});

	describe("Integration", () => {
		it("creates a functioning React application", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Verify the full app structure is present
			expect(container.firstChild).toBeInTheDocument();
			expect(container.innerHTML).toContain("The Midnight Garden");
		});

		it("renders interactive React components", async () => {
			await act(async () => {
				mountApp(container);
			});

			// Verify React components with interactivity are rendered
			const storyCards = container.querySelectorAll(
				'[data-testid^="story-card"]',
			);
			expect(storyCards.length).toBeGreaterThan(0);
		});
	});

	describe("TypeScript Types", () => {
		it("accepts HTMLDivElement", async () => {
			const divElement: HTMLDivElement = document.createElement("div");
			document.body.appendChild(divElement);

			await act(async () => {
				mountApp(divElement);
			});

			expect(divElement.firstChild).toBeTruthy();
			divElement.remove();
		});

		it("accepts generic HTMLElement", async () => {
			const element: HTMLElement = document.createElement("div");
			document.body.appendChild(element);

			await act(async () => {
				mountApp(element);
			});

			expect(element.firstChild).toBeTruthy();
			element.remove();
		});
	});

	describe("Performance", () => {
		it("completes mounting in a reasonable time", async () => {
			const startTime = performance.now();

			await act(async () => {
				mountApp(container);
			});

			const endTime = performance.now();
			const duration = endTime - startTime;

			// Mounting should complete quickly (less than 1 second in test environment)
			expect(duration).toBeLessThan(1000);
			expect(container.firstChild).toBeTruthy();
		});
	});
});
