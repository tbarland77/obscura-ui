import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import StoryList from "../features/stories/StoryList/story-list";

export default function Home() {
	return (
		<div className="min-h-screen bg-midnight flex flex-col">
			<Header />
			<main className="py-8 flex-1">
				<StoryList />
			</main>
			<Footer />
		</div>
	);
}
