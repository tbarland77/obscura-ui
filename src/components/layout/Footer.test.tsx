import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

// Wrapper component to provide router context
const FooterWithRouter = () => (
	<BrowserRouter>
		<Footer />
	</BrowserRouter>
);

describe("Footer Component", () => {
	describe("Rendering", () => {
		it("renders without crashing", () => {
			const { container } = render(<FooterWithRouter />);
			expect(container).toBeInTheDocument();
		});

		it("renders the Obscura branding", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText("Obscura")).toBeInTheDocument();
		});

		it("renders the tagline", () => {
			render(<FooterWithRouter />);
			expect(
				screen.getByText(/Where stories emerge from the shadows/i),
			).toBeInTheDocument();
		});

		it("renders current year in copyright", () => {
			render(<FooterWithRouter />);
			const currentYear = new Date().getFullYear();
			expect(
				screen.getByText(new RegExp(currentYear.toString())),
			).toBeInTheDocument();
		});

		it("renders copyright text", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText(/All mysteries reserved/i)).toBeInTheDocument();
		});

		it("renders crafted with love text", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText(/Crafted with/i)).toBeInTheDocument();
			expect(screen.getByText(/in the darkness/i)).toBeInTheDocument();
		});
	});

	describe("Structure", () => {
		it("uses semantic footer element", () => {
			const { container } = render(<FooterWithRouter />);
			const footer = container.querySelector("footer");
			expect(footer).toBeInTheDocument();
		});

		it("has proper heading hierarchy", () => {
			render(<FooterWithRouter />);
			const brandingHeading = screen.getByRole("heading", {
				level: 2,
				name: /obscura/i,
			});
			expect(brandingHeading).toBeInTheDocument();

			const sectionHeadings = screen.getAllByRole("heading", { level: 3 });
			expect(sectionHeadings.length).toBeGreaterThanOrEqual(2);
		});

		it("contains navigation links", () => {
			render(<FooterWithRouter />);
			const links = screen.getAllByRole("link");
			expect(links.length).toBeGreaterThan(0);
		});

		it("has Quick Links section", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText("Quick Links")).toBeInTheDocument();
		});

		it("has Connect section", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText("Connect")).toBeInTheDocument();
		});
	});

	describe("Navigation", () => {
		it("has link to home page", () => {
			render(<FooterWithRouter />);
			const homeLinks = screen.getAllByRole("link", { name: /home/i });
			expect(homeLinks.length).toBeGreaterThan(0);
			expect(homeLinks[0]).toHaveAttribute("href", "/");
		});

		it("has link to stories page", () => {
			render(<FooterWithRouter />);
			const storiesLink = screen.getByRole("link", { name: /stories/i });
			expect(storiesLink).toHaveAttribute("href", "/stories");
		});

		it("has link to about page", () => {
			render(<FooterWithRouter />);
			const aboutLink = screen.getByRole("link", { name: /about/i });
			expect(aboutLink).toHaveAttribute("href", "/about");
		});

		it("branding is clickable and links to home", () => {
			render(<FooterWithRouter />);
			// Find the Obscura heading which is inside a link
			const brandingLink = screen
				.getByRole("heading", { name: /obscura/i })
				.closest("a");
			expect(brandingLink).toHaveAttribute("href", "/");
		});
	});

	describe("Styling", () => {
		it("applies spooky theme colors", () => {
			const { container } = render(<FooterWithRouter />);
			const footer = container.querySelector("footer");
			expect(footer?.className).toMatch(/from-shadow/);
			expect(footer?.className).toMatch(/to-midnight/);
		});

		it("applies border and shadow effects", () => {
			const { container } = render(<FooterWithRouter />);
			const footer = container.querySelector("footer");
			expect(footer?.className).toMatch(/border-t/);
			expect(footer?.className).toMatch(/shadow-deep/);
		});

		it("applies proper spacing", () => {
			const { container } = render(<FooterWithRouter />);
			const footer = container.querySelector("footer");
			expect(footer?.className).toMatch(/py-8/);
			expect(footer?.className).toMatch(/px-4/);
		});

		it("uses mt-auto for sticky footer behavior", () => {
			const { container } = render(<FooterWithRouter />);
			const footer = container.querySelector("footer");
			expect(footer?.className).toMatch(/mt-auto/);
		});
	});

	describe("Icons", () => {
		it("renders Ghost icon in branding", () => {
			render(<FooterWithRouter />);
			// Lucide icons render as SVGs
			const brandingSection = screen.getByText("Obscura").parentElement;
			const svg = brandingSection?.querySelector("svg");
			expect(svg).toBeInTheDocument();
		});

		it("renders Moon icons in navigation", () => {
			render(<FooterWithRouter />);
			// Check that navigation items exist (they all have Moon icons)
			expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
			expect(
				screen.getByRole("link", { name: /stories/i }),
			).toBeInTheDocument();
			expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
		});

		it("renders Heart icon with pulse animation", () => {
			const { container } = render(<FooterWithRouter />);
			const heartIcon = container.querySelector(".animate-pulse");
			expect(heartIcon).toBeInTheDocument();
		});
	});

	describe("Responsive Design", () => {
		it("applies responsive container classes", () => {
			const { container } = render(<FooterWithRouter />);
			const innerContainer = container.querySelector(".max-w-4xl");
			expect(innerContainer).toBeInTheDocument();
		});

		it("applies responsive flex layout", () => {
			const { container } = render(<FooterWithRouter />);
			// Main content section should have responsive flex
			const mainContent = container.querySelector(".flex-col.md\\:flex-row");
			expect(mainContent).toBeInTheDocument();
		});

		it("centers content with mx-auto", () => {
			const { container } = render(<FooterWithRouter />);
			const innerContainer = container.querySelector(".max-w-4xl");
			expect(innerContainer?.className).toMatch(/mx-auto/);
		});
	});

	describe("Accessibility", () => {
		it("has proper semantic structure with nav element", () => {
			const { container } = render(<FooterWithRouter />);
			const nav = container.querySelector("nav");
			expect(nav).toBeInTheDocument();
		});

		it("links have hover states", () => {
			render(<FooterWithRouter />);
			const homeLink = screen.getByRole("link", { name: /home/i });
			expect(homeLink.className).toMatch(/hover:/);
		});
	});

	describe("Content", () => {
		it("displays descriptive text about the site", () => {
			render(<FooterWithRouter />);
			expect(
				screen.getByText(/mysteries unfold in the moonlight/i),
			).toBeInTheDocument();
		});

		it("displays connect section description", () => {
			render(<FooterWithRouter />);
			expect(screen.getByText(/Join us in the shadows/i)).toBeInTheDocument();
		});

		it("has divider between sections", () => {
			const { container } = render(<FooterWithRouter />);
			const divider = container.querySelector(".border-t.border-mist.my-6");
			expect(divider).toBeInTheDocument();
		});
	});

	describe("Layout", () => {
		it("uses flexbox layout for main content", () => {
			const { container } = render(<FooterWithRouter />);
			const mainContent = container.querySelector(
				".flex.flex-col.md\\:flex-row",
			);
			expect(mainContent).toBeInTheDocument();
		});

		it("has three main sections", () => {
			const { container } = render(<FooterWithRouter />);
			const flexItems = container.querySelectorAll(".flex-1");
			expect(flexItems.length).toBe(3);
		});

		it("applies gap between sections", () => {
			const { container } = render(<FooterWithRouter />);
			const mainContent = container.querySelector(".gap-8");
			expect(mainContent).toBeInTheDocument();
		});
	});
});
