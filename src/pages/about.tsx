import { BookOpen, Ghost } from "lucide-react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Section } from "../components/layout/section";

export function About() {
	return (
		<div className="min-h-screen bg-midnight flex flex-col">
			<Header />
			<main className="flex-1 py-12 px-4">
				<div className="max-w-3xl mx-auto space-y-8">
					<Section variant="hero">
						<div className="flex justify-center mb-6">
							<Ghost size={64} className="text-pumpkin animate-float" />
						</div>
						<h1 className="font-spooky text-4xl md:text-5xl text-pumpkin tracking-widest animate-text-shimmer">
							About Obscura
						</h1>
						<p className="font-eerie text-fog text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
							Where tales emerge from the shadows and mysteries linger in the
							moonlight
						</p>
					</Section>

					<Section variant="card">
						<div className="flex items-center gap-3 mb-4">
							<BookOpen size={28} className="text-pumpkin" />
							<h2 className="font-spooky text-2xl md:text-3xl text-moonlight tracking-wide">
								Our Story
							</h2>
						</div>
						<div className="font-eerie text-fog space-y-4 text-base md:text-lg leading-relaxed">
							<p>
								In the depths of the digital night,{" "}
								<span className="text-pumpkin font-semibold">Obscura</span> was
								born—a sanctuary for those who find beauty in the eerie, comfort
								in the uncanny, and wonder in the unknown. Every tale carefully
								curated to ignite your imagination and send delightful shivers
								down your spine.
							</p>
							<p>
								We believe the best stories are those whispered in shadowed
								corners, the ones that make you glance over your shoulder, the
								tales that linger like fog long after the final word fades into
								darkness.
							</p>
							<p>
								Whether you seek spine-tingling horror, atmospheric mysteries,
								or whimsical encounters with the supernatural, you'll find a
								home here among the shadows.
							</p>
							<p className="border-t border-mist pt-4 mt-6">
								Crafted with passion by one devoted storyteller,{" "}
								<span className="text-pumpkin font-semibold">Obscura</span>{" "}
								invites you to explore, share, and revel in the magic of the
								unknown. Join us, if you dare, and let your own stories emerge
								from the darkness.
							</p>
							<p className="text-moonlight italic opacity-80">
								Best regards from the shadows,
								<br />
								<span className="text-ghost not-italic font-semibold">
									Tim Barland
								</span>
								<br />
								<span className="text-sm text-fog opacity-70">
									Lead Developer & Curator of the Uncanny
								</span>
							</p>
						</div>
					</Section>
				</div>
			</main>
			<Footer />
		</div>
	);
}
