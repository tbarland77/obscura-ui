import { BookOpen } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Section } from "../components/layout/section";
import { StoryList } from "../features/stories/StoryList/story-list";

export function Home() {
	return (
		<div className="min-h-screen bg-midnight flex flex-col">
			<Header />
			<main className="py-8 flex-1">
				<div className="max-w-4xl mx-auto px-4 space-y-8">
					<Section variant="hero" className="mb-8">
						<BookOpen
							size={48}
							className="text-pumpkin mx-auto mb-4 animate-float"
						/>
						<h1 className="font-spooky text-3xl md:text-4xl text-pumpkin tracking-widest">
							Recent Tales
						</h1>
						<p className="font-eerie text-fog text-base md:text-lg opacity-80 max-w-xl mx-auto">
							Dive into our latest collection of spine-tingling stories
						</p>
					</Section>

					<StoryList />
				</div>
			</main>
			<Footer />
		</div>
	);
}
