import { Ghost } from "lucide-react";
import { Link } from "react-router-dom";
import { ObscuraLogo } from "../icons/ObscuraLogo";

export function Header() {
	return (
		<header className="sticky top-0 z-50 bg-linear-to-br from-shadow to-midnight border-b border-mist py-6 px-4 shadow-deep backdrop-blur-sm">
			<div className="max-w-4xl mx-auto flex items-center gap-4">
				<Link
					to="/"
					className="shrink-0 transition-transform hover:scale-105"
					aria-label="Go to home page"
				>
					<ObscuraLogo size={56} className="animate-float" />
				</Link>
				<div className="flex-1">
					<Link to="/" className="inline-block group">
						<h1 className="font-spooky text-3xl md:text-4xl text-pumpkin tracking-widest animate-text-shimmer group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(255,117,24,0.6)] transition-all duration-200">
							Obscura
						</h1>
					</Link>
					<p className="font-eerie text-fog text-sm md:text-base opacity-80 flex items-center gap-2 group">
						<Ghost
							size={16}
							className="text-moonlight opacity-70 group-hover:opacity-100 transition-opacity duration-300"
						/>
						Tales from the shadows
					</p>
				</div>
			</div>
		</header>
	);
}
