import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Home } from "./home";

// Wrapper component to provide router context
const HomeWithRouter = () => (
	<BrowserRouter>
		<Home />
	</BrowserRouter>
);

describe("Home Page", () => {
	describe("Component Rendering", () => {
		it("renders without crashing", () => {
			const { container } = render(<HomeWithRouter />);
			expect(container).toBeInTheDocument();
		});

		it("renders the StoryList component", () => {
			render(<HomeWithRouter />);

			// Verify the story list container is present
			const storyContainer = document.querySelector('[class*="space-y"]');
			expect(storyContainer).toBeInTheDocument();
		});
	});

	describe("Story Display", () => {
		it("displays all mock stories", () => {
			render(<HomeWithRouter />);

			// Check for all 5 story titles
			expect(screen.getByText("The Midnight Garden")).toBeInTheDocument();
			expect(screen.getByText("Blood Moon Rising")).toBeInTheDocument();
			expect(screen.getByText("Fog Over the Harbor")).toBeInTheDocument();
			expect(screen.getByText("Pumpkin Letters")).toBeInTheDocument();
			expect(screen.getByText("Ghostlight")).toBeInTheDocument();
		});

		it("renders the correct number of story cards", () => {
			render(<HomeWithRouter />);

			// Should have 5 articles (story cards)
			const storyCards = screen.getAllByRole("article");
			expect(storyCards).toHaveLength(5);
		});

		it("displays story content previews", () => {
			render(<HomeWithRouter />);

			// Check for story content snippets
			expect(
				screen.getByText(/A winding path of moonlit flowers/i),
			).toBeInTheDocument();
			expect(
				screen.getByText(/Under the red moon the town changed/i),
			).toBeInTheDocument();
			expect(screen.getByText(/Boats moved like ghosts/i)).toBeInTheDocument();
		});

		it("displays author information for all stories", () => {
			render(<HomeWithRouter />);

			// Check for all authors
			expect(screen.getByText(/M. Night/i)).toBeInTheDocument();
			expect(screen.getByText(/A. Nightingale/i)).toBeInTheDocument();
			expect(screen.getByText(/C. Harrow/i)).toBeInTheDocument();
			expect(screen.getByText(/E. Holloway/i)).toBeInTheDocument();
			expect(screen.getByText(/R. Vale/i)).toBeInTheDocument();
		});
	});

	describe("Layout and Structure", () => {
		it("uses proper semantic HTML structure", () => {
			render(<HomeWithRouter />);

			// All stories should be articles
			const articles = screen.getAllByRole("article");
			expect(articles.length).toBeGreaterThan(0);

			// Each article should have a heading
			const headings = screen.getAllByRole("heading");
			expect(headings.length).toBeGreaterThan(0);
		});

		it("applies responsive container classes", () => {
			render(<HomeWithRouter />);

			// Check for the story list container with spacing classes
			const container = document.querySelector('[class*="space-y"]');
			expect(container).toBeInTheDocument();
			expect(container?.className).toMatch(/space-y/);
		});

		it("applies max-width and centering classes", () => {
			render(<HomeWithRouter />);

			const container = document.querySelector('[class*="max-w"]');
			expect(container).toBeInTheDocument();
			expect(container?.className).toMatch(/max-w/);
			expect(container?.className).toMatch(/mx-auto/);
		});
	});

	describe("Accessibility", () => {
		it("has accessible story card labels", () => {
			render(<HomeWithRouter />);

			// Check that story cards have aria-labels
			expect(
				screen.getByLabelText(/Story titled The Midnight Garden/i),
			).toBeInTheDocument();
			expect(
				screen.getByLabelText(/Story titled Blood Moon Rising/i),
			).toBeInTheDocument();
			expect(
				screen.getByLabelText(/Story titled Fog Over the Harbor/i),
			).toBeInTheDocument();
		});

		it("uses proper heading hierarchy", () => {
			render(<HomeWithRouter />);

			// All story titles should be h2 elements (5 stories + 1 footer branding)
			const headings = screen.getAllByRole("heading", { level: 2 });
			expect(headings.length).toBeGreaterThanOrEqual(5);
		});

		it("provides test IDs for story cards", () => {
			render(<HomeWithRouter />);

			// Check for test IDs
			expect(screen.getByTestId("story-card-1")).toBeInTheDocument();
			expect(screen.getByTestId("story-card-2")).toBeInTheDocument();
			expect(screen.getByTestId("story-card-3")).toBeInTheDocument();
			expect(screen.getByTestId("story-card-4")).toBeInTheDocument();
			expect(screen.getByTestId("story-card-5")).toBeInTheDocument();
		});
	});

	describe("Story Card Details", () => {
		it("displays tags for stories that have them", () => {
			render(<HomeWithRouter />);

			// The Midnight Garden has tags: mystery, short
			expect(screen.getAllByText(/mystery/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/short/i).length).toBeGreaterThan(0);

			// Blood Moon Rising has tags: horror, thriller
			expect(screen.getAllByText(/horror/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/thriller/i).length).toBeGreaterThan(0);
		});

		it("displays call-to-action text on story cards", () => {
			render(<HomeWithRouter />);

			// Each story card should have "Click to read more"
			const ctaElements = screen.getAllByText(/Click to read more/i);
			expect(ctaElements).toHaveLength(5);
		});

		it("renders stories in the correct order", () => {
			render(<HomeWithRouter />);

			const articles = screen.getAllByRole("article");

			// Verify order by checking data-testid
			expect(articles[0]).toHaveAttribute("data-testid", "story-card-1");
			expect(articles[1]).toHaveAttribute("data-testid", "story-card-2");
			expect(articles[2]).toHaveAttribute("data-testid", "story-card-3");
			expect(articles[3]).toHaveAttribute("data-testid", "story-card-4");
			expect(articles[4]).toHaveAttribute("data-testid", "story-card-5");
		});
	});

	describe("Content Validation", () => {
		it("displays complete story information for each card", () => {
			render(<HomeWithRouter />);

			// Check first story card has all required information
			const firstCard = screen.getByTestId("story-card-1");

			expect(
				within(firstCard).getByText("The Midnight Garden"),
			).toBeInTheDocument();
			expect(within(firstCard).getByText(/M. Night/i)).toBeInTheDocument();
			expect(
				within(firstCard).getByText(/A winding path of moonlit flowers/i),
			).toBeInTheDocument();
			expect(within(firstCard).getAllByText(/mystery/i).length).toBeGreaterThan(
				0,
			);
		});

		it("truncates long story content appropriately", () => {
			render(<HomeWithRouter />);

			// Story content should have line-clamp class for truncation
			const contentElements = document.querySelectorAll(
				'[class*="line-clamp"]',
			);
			expect(contentElements.length).toBeGreaterThan(0);
		});
	});

	describe("Integration", () => {
		it("integrates correctly with StoryList component", () => {
			render(<HomeWithRouter />);

			// Home should render StoryList which renders all stories
			const storyCards = screen.getAllByRole("article");
			expect(storyCards).toHaveLength(5);

			// Verify StoryList renders all 5 cards
			expect(storyCards).toHaveLength(5);
		});

		it("renders all story data from StoryList mock", () => {
			render(<HomeWithRouter />);

			// Verify all mock story IDs are present via test IDs
			for (let i = 1; i <= 5; i++) {
				expect(screen.getByTestId(`story-card-${i}`)).toBeInTheDocument();
			}
		});
	});

	describe("Visual Styling", () => {
		it("applies theme colors to story cards", () => {
			render(<HomeWithRouter />);

			const firstCard = screen.getByTestId("story-card-1");

			// Check for theme-related classes
			expect(firstCard.className).toMatch(/bg-/); // Background color
			expect(firstCard.className).toMatch(/text-/); // Text color
		});

		it("applies hover effects to story cards", () => {
			render(<HomeWithRouter />);

			const cards = screen.getAllByRole("article");

			// Each card should have hover classes
			cards.forEach((card) => {
				expect(card.className).toMatch(/hover:/);
			});
		});

		it("applies proper spacing between story cards", () => {
			render(<HomeWithRouter />);

			// StoryList container has space-y-4 for cards
			const storyListContainer = document.querySelector(".space-y-4");
			expect(storyListContainer?.className).toMatch(/space-y-4/);
		});
	});

	describe("Edge Cases", () => {
		it("handles rendering when component mounts", () => {
			const { unmount } = render(<HomeWithRouter />);

			expect(screen.getByText("The Midnight Garden")).toBeInTheDocument();

			unmount();

			// After unmount, content should not be in document
			expect(screen.queryByText("The Midnight Garden")).not.toBeInTheDocument();
		});

		it("renders consistently on multiple mounts", () => {
			const { unmount } = render(<HomeWithRouter />);
			let storyCards = screen.getAllByRole("article");
			expect(storyCards).toHaveLength(5);

			unmount();

			render(<HomeWithRouter />);
			storyCards = screen.getAllByRole("article");
			expect(storyCards).toHaveLength(5);
		});
	});
});
