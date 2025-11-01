import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Section } from "./section";

describe("Section Component", () => {
	describe("Rendering", () => {
		it("renders without crashing", () => {
			const { container } = render(<Section>Test content</Section>);
			expect(container).toBeInTheDocument();
		});

		it("renders children content", () => {
			render(<Section>Hello World</Section>);
			expect(screen.getByText("Hello World")).toBeInTheDocument();
		});

		it("renders complex children", () => {
			render(
				<Section>
					<h1>Title</h1>
					<p>Paragraph</p>
				</Section>,
			);
			expect(screen.getByText("Title")).toBeInTheDocument();
			expect(screen.getByText("Paragraph")).toBeInTheDocument();
		});
	});

	describe("Variants", () => {
		it("applies hero variant classes", () => {
			const { container } = render(
				<Section variant="hero">Hero content</Section>,
			);
			const section = container.querySelector("section");
			expect(section?.className).toContain("text-center");
			expect(section?.className).toContain("space-y-4");
		});

		it("applies card variant classes", () => {
			const { container } = render(
				<Section variant="card">Card content</Section>,
			);
			const section = container.querySelector("section");
			expect(section?.className).toContain("bg-linear-to-br");
			expect(section?.className).toContain("from-shadow");
			expect(section?.className).toContain("to-midnight");
			expect(section?.className).toContain("border");
			expect(section?.className).toContain("border-mist");
			expect(section?.className).toContain("rounded-lg");
			expect(section?.className).toContain("shadow-deep");
		});

		it("applies plain variant (no default classes)", () => {
			const { container } = render(
				<Section variant="plain">Plain content</Section>,
			);
			const section = container.querySelector("section");
			// Should only have custom className if provided, otherwise empty/minimal
			expect(section?.className).not.toContain("text-center");
			expect(section?.className).not.toContain("bg-linear-to-br");
		});

		it("defaults to plain variant when no variant specified", () => {
			const { container } = render(<Section>Default content</Section>);
			const section = container.querySelector("section");
			expect(section?.className).not.toContain("text-center");
			expect(section?.className).not.toContain("bg-linear-to-br");
		});
	});

	describe("Custom className", () => {
		it("applies custom className", () => {
			const { container } = render(
				<Section className="custom-class">Content</Section>,
			);
			const section = container.querySelector("section");
			expect(section?.className).toContain("custom-class");
		});

		it("merges custom className with variant classes", () => {
			const { container } = render(
				<Section variant="hero" className="mb-8">
					Content
				</Section>,
			);
			const section = container.querySelector("section");
			expect(section?.className).toContain("text-center"); // From variant
			expect(section?.className).toContain("space-y-4"); // From variant
			expect(section?.className).toContain("mb-8"); // Custom
		});

		it("handles empty className gracefully", () => {
			const { container } = render(<Section className="">Content</Section>);
			const section = container.querySelector("section");
			expect(section).toBeInTheDocument();
		});
	});

	describe("Polymorphic 'as' prop", () => {
		it("renders as section by default", () => {
			const { container } = render(<Section>Content</Section>);
			const section = container.querySelector("section");
			expect(section).toBeInTheDocument();
		});

		it("renders as div when as='div'", () => {
			const { container } = render(<Section as="div">Content</Section>);
			const div = container.querySelector("div");
			const section = container.querySelector("section");
			expect(div).toBeInTheDocument();
			expect(section).not.toBeInTheDocument();
		});

		it("renders as article when as='article'", () => {
			const { container } = render(<Section as="article">Content</Section>);
			const article = container.querySelector("article");
			const section = container.querySelector("section");
			expect(article).toBeInTheDocument();
			expect(section).not.toBeInTheDocument();
		});

		it("applies variant classes regardless of element type", () => {
			const { container } = render(
				<Section as="div" variant="hero">
					Content
				</Section>,
			);
			const div = container.querySelector("div");
			expect(div?.className).toContain("text-center");
			expect(div?.className).toContain("space-y-4");
		});
	});

	describe("Combined Props", () => {
		it("handles all props together", () => {
			const { container } = render(
				<Section as="article" variant="card" className="extra-margin">
					<h1>Title</h1>
					<p>Content</p>
				</Section>,
			);

			const article = container.querySelector("article");
			expect(article).toBeInTheDocument();
			expect(article?.className).toContain("bg-linear-to-br"); // Variant
			expect(article?.className).toContain("extra-margin"); // Custom
			expect(screen.getByText("Title")).toBeInTheDocument(); // Children
		});
	});

	describe("Edge Cases", () => {
		it("handles undefined children", () => {
			const { container } = render(<Section>{undefined}</Section>);
			expect(container.querySelector("section")).toBeInTheDocument();
		});

		it("handles null children", () => {
			const { container } = render(<Section>{null}</Section>);
			expect(container.querySelector("section")).toBeInTheDocument();
		});

		it("handles multiple children", () => {
			render(
				<Section>
					<span>First</span>
					<span>Second</span>
					<span>Third</span>
				</Section>,
			);
			expect(screen.getByText("First")).toBeInTheDocument();
			expect(screen.getByText("Second")).toBeInTheDocument();
			expect(screen.getByText("Third")).toBeInTheDocument();
		});

		it("trims whitespace in className", () => {
			const { container } = render(
				<Section className="  test  ">Content</Section>,
			);
			const section = container.querySelector("section");
			// The trim() in component ensures no leading/trailing spaces
			expect(section?.className).not.toMatch(/^\s+/);
			expect(section?.className).not.toMatch(/\s+$/);
		});
	});

	describe("Accessibility", () => {
		it("uses semantic section element by default", () => {
			const { container } = render(<Section>Content</Section>);
			expect(container.querySelector("section")).toBeInTheDocument();
		});

		it("can use semantic article element", () => {
			const { container } = render(<Section as="article">Content</Section>);
			expect(container.querySelector("article")).toBeInTheDocument();
		});

		it("preserves child element semantics", () => {
			render(
				<Section>
					<h1>Heading</h1>
				</Section>,
			);
			expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
		});
	});

	describe("Styling Consistency", () => {
		it("hero variant has consistent spacing", () => {
			const { container } = render(<Section variant="hero">Content</Section>);
			const section = container.querySelector("section");
			expect(section?.className).toContain("space-y-4");
		});

		it("card variant has consistent padding", () => {
			const { container } = render(<Section variant="card">Content</Section>);
			const section = container.querySelector("section");
			expect(section?.className).toMatch(/p-6|md:p-8/);
		});

		it("maintains class order (variant first, then custom)", () => {
			const { container } = render(
				<Section variant="hero" className="custom">
					Content
				</Section>,
			);
			const section = container.querySelector("section");
			const classes = section?.className || "";
			// Variant classes should appear before custom
			const heroIndex = classes.indexOf("text-center");
			const customIndex = classes.indexOf("custom");
			expect(heroIndex).toBeLessThan(customIndex);
		});
	});
});
