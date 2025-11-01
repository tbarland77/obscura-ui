import { Ghost, Heart, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto bg-linear-to-br from-shadow to-midnight border-t border-mist py-8 px-4 shadow-deep">
			<div className="max-w-4xl mx-auto">
				{/* Main footer content */}
				<div className="flex flex-col md:flex-row gap-8 mb-6">
					{/* Branding section */}
					<div className="flex-1">
						<Link to="/" className="inline-block group mb-3">
							<h2 className="font-spooky text-2xl text-pumpkin tracking-widest group-hover:brightness-125 transition-all duration-200 flex items-center gap-2">
								<Ghost size={24} className="opacity-80" />
								Obscura
							</h2>
						</Link>
						<p className="font-eerie text-fog text-sm opacity-70 max-w-xs">
							Where stories emerge from the shadows and mysteries unfold in the
							moonlight.
						</p>
					</div>

					{/* Quick links section */}
					<div className="flex-1">
						<h3 className="font-spooky text-lg text-moonlight mb-3 tracking-wide hover:text-pumpkin transition-colors duration-300 cursor-default">
							Quick Links
						</h3>
						<nav className="flex flex-col gap-2">
							<Link
								to="/"
								className="font-eerie text-fog text-sm hover:text-pumpkin transition-all duration-200 inline-flex items-center gap-2 group hover:translate-x-1"
							>
								<Moon
									size={14}
									className="opacity-70 group-hover:opacity-100 transition-opacity"
								/>
								Home
							</Link>
							<Link
								to="/stories"
								className="font-eerie text-fog text-sm hover:text-pumpkin transition-all duration-200 inline-flex items-center gap-2 group hover:translate-x-1"
							>
								<Moon
									size={14}
									className="opacity-70 group-hover:opacity-100 transition-opacity"
								/>
								Stories
							</Link>
							<Link
								to="/about"
								className="font-eerie text-fog text-sm hover:text-pumpkin transition-all duration-200 inline-flex items-center gap-2 group hover:translate-x-1"
							>
								<Moon
									size={14}
									className="opacity-70 group-hover:opacity-100 transition-opacity"
								/>
								About
							</Link>
						</nav>
					</div>

					{/* Social/Info section */}
					<div className="flex-1">
						<h3 className="font-spooky text-lg text-moonlight mb-3 tracking-wide hover:text-pumpkin transition-colors duration-300 cursor-default">
							Connect
						</h3>
						<p className="font-eerie text-fog text-sm opacity-70">
							Join us in the shadows and share your own tales of mystery and
							wonder.
						</p>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-mist my-6" />

				{/* Copyright section */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
					<p className="font-eerie text-fog opacity-60 flex items-center gap-2">
						<span>&copy; {currentYear} Obscura.</span>
						<span className="hidden md:inline">All mysteries reserved.</span>
					</p>
					<p className="font-eerie text-fog opacity-60 flex items-center gap-2">
						<span>Crafted with</span>
						<Heart
							size={14}
							className="text-blood animate-pulse"
							fill="currentColor"
						/>
						<span>in the darkness</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
