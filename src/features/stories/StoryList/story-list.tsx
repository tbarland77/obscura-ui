import { StoryCard } from "../StoryCard/story-card";

type Story = {
  id: string;
  title: string;
  content: string;
  author: string;
  tags?: string[];
  createdAt: string;
};

const mockStories: Story[] = [
  {
    id: "1",
    title: "The Midnight Garden",
    content:
      "A winding path of moonlit flowers and whispered secrets unfolds before you. Each bloom seems to glow with an inner light, casting strange shadows on the twisted roots beneath. Perfect for a short, eerie vignette about curiosity and the cost of knowing too much.",
    author: "M. Night",
    tags: ["mystery", "short"],
    createdAt: "2025-10-01",
  },
  {
    id: "2",
    title: "Blood Moon Rising",
    content:
      "Under the red moon the town changed. Small kindnesses turned sharp and bitter, old promises came due with interest, and the streets that once felt familiar became a labyrinth of possibility and dread. Nothing would ever be quite the same again.",
    author: "A. Nightingale",
    tags: ["horror", "thriller"],
    createdAt: "2025-09-18",
  },
  {
    id: "3",
    title: "Fog Over the Harbor",
    content:
      "Boats moved like ghosts across the water, each carrying a story no one had the courage to tell aloud. The fog grew thicker with each passing hour, until the entire world became a murky, timeless place where nothing felt real and everything felt possible.",
    author: "C. Harrow",
    tags: ["atmospheric", "maritime"],
    createdAt: "2025-08-30",
  },
  {
    id: "4",
    title: "Pumpkin Letters",
    content:
      "A stack of letters tied with orange twine arrived at the doorstep and everything in the house remembered how to laugh. Inside were secrets from summers long past, confessions written in fading ink, and the kind of joy that only comes from being remembered.",
    author: "E. Holloway",
    tags: ["whimsy", "seasonal"],
    createdAt: "2025-10-10",
  },
  {
    id: "5",
    title: "Ghostlight",
    content:
      "A stray flare in the alley that only appeared to those who needed to find something they had lost. It never spoke, never beckoned, but somehow it always led you exactly where you needed to go, revealing truths you didn't know you were searching for.",
    author: "R. Vale",
    tags: ["speculative", "short"],
    createdAt: "2025-07-21",
  },
];

export default function StoryList() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto px-4">
      {mockStories.map((s) => (
        <StoryCard
          key={s.id}
          title={s.title}
          content={s.content}
          author={s.author}
          tags={s.tags}
          createdAt={s.createdAt}
        />
      ))}
    </div>
  );
}
