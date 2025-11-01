import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { StoryList } from "./story-list";

const StoryListWithRouter = () => (
	<MemoryRouter>
		<StoryList />
	</MemoryRouter>
);

describe("StoryList", () => {
	it("renders all 5 mock stories", () => {
		render(<StoryListWithRouter />);
		const storyCards = screen.getAllByRole("article");
		expect(storyCards).toHaveLength(5);
	});

	it("renders story titles", () => {
		render(<StoryListWithRouter />);
		expect(screen.getByText("The Midnight Garden")).toBeInTheDocument();
		expect(screen.getByText("Blood Moon Rising")).toBeInTheDocument();
		expect(screen.getByText("Fog Over the Harbor")).toBeInTheDocument();
		expect(screen.getByText("Pumpkin Letters")).toBeInTheDocument();
		expect(screen.getByText("Ghostlight")).toBeInTheDocument();
	});

	it("renders story authors", () => {
		render(<StoryListWithRouter />);
		expect(screen.getByText("By M. Night")).toBeInTheDocument();
		expect(screen.getByText("By A. Nightingale")).toBeInTheDocument();
		expect(screen.getByText("By C. Harrow")).toBeInTheDocument();
	});

	it("renders story cards with correct data-testid", () => {
		render(<StoryListWithRouter />);
		expect(screen.getByTestId("story-card-1")).toBeInTheDocument();
		expect(screen.getByTestId("story-card-2")).toBeInTheDocument();
		expect(screen.getByTestId("story-card-3")).toBeInTheDocument();
		expect(screen.getByTestId("story-card-4")).toBeInTheDocument();
		expect(screen.getByTestId("story-card-5")).toBeInTheDocument();
	});

	it("renders all story tags", () => {
		render(<StoryListWithRouter />);
		expect(screen.getByText("#mystery")).toBeInTheDocument();
		expect(screen.getByText("#horror")).toBeInTheDocument();
		expect(screen.getByText("#atmospheric")).toBeInTheDocument();
		expect(screen.getByText("#whimsy")).toBeInTheDocument();
		expect(screen.getByText("#speculative")).toBeInTheDocument();
	});
});

describe("StoryList - Layout", () => {
	it("applies correct spacing classes to container", () => {
		const { container } = render(<StoryListWithRouter />);
		const listContainer = container.querySelector(".space-y-4") as HTMLElement;
		expect(listContainer?.className).toContain("space-y-4");
	});

	it("renders stories in correct order", () => {
		render(<StoryListWithRouter />);
		const storyCards = screen.getAllByRole("article");
		expect(storyCards[0]).toHaveAttribute("data-testid", "story-card-1");
		expect(storyCards[1]).toHaveAttribute("data-testid", "story-card-2");
		expect(storyCards[2]).toHaveAttribute("data-testid", "story-card-3");
		expect(storyCards[3]).toHaveAttribute("data-testid", "story-card-4");
		expect(storyCards[4]).toHaveAttribute("data-testid", "story-card-5");
	});
});
