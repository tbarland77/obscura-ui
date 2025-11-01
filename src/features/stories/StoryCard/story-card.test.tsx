import { cleanup, render, screen } from "@testing-library/react";
import { StoryCard } from "./story-card";

const mockStory = {
	id: "1",
	title: "The Haunted Manor",
	content:
		"A spine-chilling tale of mystery and suspense that unfolds within the walls of an ancient manor...",
	author: "Jane Doe",
	tags: ["horror", "mystery", "classic"],
	createdAt: "2025-10-29",
};

describe("StoryCard", () => {
	beforeEach(() => {
		render(<StoryCard {...mockStory} />);
	});

	afterEach(() => {
		cleanup();
	});

	it("renders the story title", () => {
		expect(screen.getByText(mockStory.title)).toBeInTheDocument();
	});

	it("renders the story content", () => {
		expect(screen.getByText(mockStory.content)).toBeInTheDocument();
	});

	it("renders the author name", () => {
		expect(screen.getByText(`By ${mockStory.author}`)).toBeInTheDocument();
	});

	it("renders the creation date", () => {
		const expectedDate = new Date(
			`${mockStory.createdAt}T00:00:00Z`,
		).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		});
		expect(screen.getByText(expectedDate)).toBeInTheDocument();
	});

	it("renders all tags", () => {
		for (const tag of mockStory.tags) {
			expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
		}
	});

	it("applies different colors to tags based on their index", () => {
		const allTags = screen.getAllByText(/^#/);
		expect(allTags).toHaveLength(3);
	});
});

describe("StoryCard - Conditional Content", () => {
	it('shows "Click to read more" for long content', () => {
		const longStory = { ...mockStory, content: mockStory.content.repeat(10) };
		render(<StoryCard {...longStory} />);
		expect(screen.getByText("Click to read more")).toBeInTheDocument();
		expect(
			screen.getByLabelText(`Read full story: ${longStory.title}`),
		).toBeInTheDocument();
	});

	it('does not show "Click to read more" for short content', () => {
		const shortStory = { ...mockStory, content: "Short content." };
		render(<StoryCard {...shortStory} />);
		expect(screen.queryByText("Click to read more")).not.toBeInTheDocument();
		cleanup();
	});
});

describe("StoryCard - Optional Props", () => {
	it("renders without tags when none are provided", () => {
		const storyWithoutTags = { ...mockStory, tags: [] };
		render(<StoryCard {...storyWithoutTags} />);
		const tags = screen.queryAllByText(/^#/);
		expect(tags).toHaveLength(0);
		cleanup();
	});

	it("renders with default empty tags array", () => {
		const { tags: _tags, ...storyWithoutProps } = mockStory;
		render(<StoryCard {...storyWithoutProps} tags={undefined} />);
		const tags_found = screen.queryAllByText(/^#/);
		expect(tags_found).toHaveLength(0);
		cleanup();
	});
});
