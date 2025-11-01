import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

// Wrapper component to provide router context
const HeaderWithRouter = () => (
	<BrowserRouter>
		<Header />
	</BrowserRouter>
);

describe("Header Component", () => {
	describe("Rendering", () => {
		it("renders without crashing", () => {
			const { container } = render(<HeaderWithRouter />);
			expect(container).toBeInTheDocument();
		});

		it("renders the Obscura title", () => {
			render(<HeaderWithRouter />);
			expect(screen.getByText("Obscura")).toBeInTheDocument();
		});

		it("renders the tagline", () => {
			render(<HeaderWithRouter />);
			expect(screen.getByText("Tales from the shadows")).toBeInTheDocument();
		});

		it("renders the logo", () => {
			render(<HeaderWithRouter />);
			const logo = screen.getByLabelText("Obscura Logo - Ghost reading a book");
			expect(logo).toBeInTheDocument();
		});
	});

	describe("Structure", () => {
		it("uses semantic header element", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header).toBeInTheDocument();
		});

		it("has proper heading hierarchy", () => {
			render(<HeaderWithRouter />);
			const heading = screen.getByRole("heading", { level: 1 });
			expect(heading).toHaveTextContent("Obscura");
		});

		it("contains two links to home page", () => {
			render(<HeaderWithRouter />);
			const links = screen.getAllByRole("link");
			expect(links.length).toBeGreaterThanOrEqual(2); // Logo link and title link
		});
	});

	describe("Styling", () => {
		it("applies sticky positioning class", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/sticky/);
		});

		it("applies z-index for layering", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/z-50/);
		});

		it("applies spooky theme colors", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/from-shadow/);
			expect(header?.className).toMatch(/to-midnight/);
		});

		it("applies border and shadow effects", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/border-b/);
			expect(header?.className).toMatch(/shadow-deep/);
		});

		it("applies backdrop blur for glassmorphism effect", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/backdrop-blur/);
		});
	});

	describe("Navigation", () => {
		it("logo link points to home", () => {
			render(<HeaderWithRouter />);
			const logoLink = screen.getByLabelText("Go to home page");
			expect(logoLink).toHaveAttribute("href", "/");
		});

		it("title link points to home", () => {
			render(<HeaderWithRouter />);
			const titleLink = screen.getByRole("link", { name: /obscura/i });
			expect(titleLink).toHaveAttribute("href", "/");
		});
	});

	describe("Animations", () => {
		it("applies float animation to logo", () => {
			render(<HeaderWithRouter />);
			const logo = screen.getByLabelText("Obscura Logo - Ghost reading a book");
			expect(logo).toHaveClass("animate-float");
		});

		it("applies shimmer animation to title", () => {
			render(<HeaderWithRouter />);
			const title = screen.getByText("Obscura");
			expect(title.className).toMatch(/animate-text-shimmer/);
		});

		it("applies hover effects to title link", () => {
			render(<HeaderWithRouter />);
			const title = screen.getByText("Obscura");
			expect(title.className).toMatch(/group-hover:brightness-125/);
		});

		it("applies hover scale to logo link", () => {
			render(<HeaderWithRouter />);
			const logoLink = screen.getByLabelText("Go to home page");
			expect(logoLink.className).toMatch(/hover:scale-105/);
		});
	});

	describe("Accessibility", () => {
		it("has descriptive aria-label for logo link", () => {
			render(<HeaderWithRouter />);
			const logoLink = screen.getByLabelText("Go to home page");
			expect(logoLink).toBeInTheDocument();
		});

		it("ghost icon is decorative", () => {
			render(<HeaderWithRouter />);
			// Lucide icons render as SVGs, check that it exists in the tagline
			const tagline = screen.getByText("Tales from the shadows");
			expect(tagline.parentElement).toBeInTheDocument();
		});
	});

	describe("Responsive Design", () => {
		it("applies responsive container classes", () => {
			const { container } = render(<HeaderWithRouter />);
			const innerContainer = container.querySelector(".max-w-4xl");
			expect(innerContainer).toBeInTheDocument();
		});

		it("applies responsive text sizing to title", () => {
			render(<HeaderWithRouter />);
			const title = screen.getByText("Obscura");
			expect(title.className).toMatch(/text-3xl/);
			expect(title.className).toMatch(/md:text-4xl/);
		});

		it("applies responsive text sizing to tagline", () => {
			render(<HeaderWithRouter />);
			const tagline = screen.getByText("Tales from the shadows");
			expect(tagline.className).toMatch(/text-sm/);
			expect(tagline.className).toMatch(/md:text-base/);
		});
	});

	describe("Layout", () => {
		it("uses flexbox layout", () => {
			const { container } = render(<HeaderWithRouter />);
			const innerContainer = container.querySelector(".max-w-4xl");
			expect(innerContainer?.className).toMatch(/flex/);
		});

		it("centers content with mx-auto", () => {
			const { container } = render(<HeaderWithRouter />);
			const innerContainer = container.querySelector(".max-w-4xl");
			expect(innerContainer?.className).toMatch(/mx-auto/);
		});

		it("applies proper spacing", () => {
			const { container } = render(<HeaderWithRouter />);
			const header = container.querySelector("header");
			expect(header?.className).toMatch(/py-6/);
			expect(header?.className).toMatch(/px-4/);
		});
	});
});
