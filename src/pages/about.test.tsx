import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { About } from "./about";

const AboutWithRouter = () => (
	<MemoryRouter>
		<About />
	</MemoryRouter>
);

describe("About Page", () => {
	describe("Rendering", () => {
		it("renders the About page correctly", () => {
			render(<AboutWithRouter />);
			expect(screen.getByText("About Obscura")).toBeInTheDocument();
		});

		it("renders the hero section with ghost icon", () => {
			render(<AboutWithRouter />);
			const heading = screen.getByRole("heading", {
				level: 1,
				name: "About Obscura",
			});
			expect(heading).toBeInTheDocument();
			expect(
				screen.getByText(
					"Where tales emerge from the shadows and mysteries linger in the moonlight",
				),
			).toBeInTheDocument();
		});

		it("renders the Our Story section", () => {
			render(<AboutWithRouter />);
			expect(
				screen.getByRole("heading", { level: 2, name: "Our Story" }),
			).toBeInTheDocument();
		});

		it("renders the signature", () => {
			render(<AboutWithRouter />);
			expect(screen.getByText("Tim Barland")).toBeInTheDocument();
			expect(
				screen.getByText("Lead Developer & Curator of the Uncanny"),
			).toBeInTheDocument();
		});
	});

	describe("Content", () => {
		it("includes key content about Obscura", () => {
			render(<AboutWithRouter />);
			expect(
				screen.getByText(/In the depths of the digital night/),
			).toBeInTheDocument();
			expect(
				screen.getByText(/We believe the best stories/),
			).toBeInTheDocument();
		});

		it("mentions story types", () => {
			render(<AboutWithRouter />);
			expect(
				screen.getByText(
					/spine-tingling horror, atmospheric mysteries, or whimsical encounters/,
				),
			).toBeInTheDocument();
		});
	});

	describe("Layout Structure", () => {
		it("uses Section components for layout", () => {
			const { container } = render(<AboutWithRouter />);
			// Should have sections rendered by Section component
			const sections = container.querySelectorAll("section");
			expect(sections.length).toBeGreaterThanOrEqual(2);
		});

		it("has responsive container with max width", () => {
			const { container } = render(<AboutWithRouter />);
			const mainContent = container.querySelector("main");
			expect(mainContent).toBeInTheDocument();
			const contentDiv = mainContent?.querySelector(".max-w-3xl");
			expect(contentDiv).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("has proper heading hierarchy", () => {
			render(<AboutWithRouter />);
			const headings = screen.getAllByRole("heading");
			const h1s = headings.filter((h) => h.tagName === "H1");
			const h2s = headings.filter((h) => h.tagName === "H2");
			expect(h1s.length).toBeGreaterThanOrEqual(1);
			expect(h2s.length).toBeGreaterThanOrEqual(1);
		});

		it("includes Header and Footer components", () => {
			const { container } = render(<AboutWithRouter />);
			expect(container.querySelector("header")).toBeInTheDocument();
			expect(container.querySelector("footer")).toBeInTheDocument();
		});
	});
});
