import { BookOpen, Calendar, User } from "lucide-react";
import type { FC } from "react";

type StoryCardProps = {
	id: string;
	title: string;
	content: string;
	author: string;
	tags?: string[];
	createdAt: string;
	onClick?: () => void;
};

export const StoryCard: FC<StoryCardProps> = ({
	id,
	title,
	content,
	author,
	tags = [],
	createdAt,
	onClick,
}) => {
	const tagColors = ["bg-blood", "bg-pumpkin", "bg-moonlight"];

	// Stagger animation based on card position
	const animationDelay = `${(Number.parseInt(id, 10) - 1) * 100}ms`;

	// Format date in UTC to avoid timezone issues
	const formatDate = (dateString: string) => {
		const date = new Date(`${dateString}T00:00:00Z`);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		});
	};

	return (
		<article
			className="animate-fade-in bg-linear-to-br from-midnight to-shadow text-ghost shadow-deep hover:shadow-[0_12px_40px_rgba(255,117,24,0.25)] p-3 sm:p-4 md:p-6 rounded-lg transition-all duration-300 border-l-4 border-pumpkin hover:scale-[1.02] group hover-lift"
			style={{ animationDelay }}
			data-testid={`story-card-${id}`}
			aria-label={`Story titled ${title}`}
		>
			<div className="flex items-start gap-2 mb-2">
				<BookOpen
					size={20}
					className="text-pumpkin opacity-70 mt-1 shrink-0"
					aria-hidden="true"
				/>
				<h2 className="font-spooky text-lg sm:text-xl md:text-2xl text-pumpkin tracking-widest transition-all pb-1 border-b-2 border-pumpkin group-hover:brightness-125 group-hover:text-shadow-lg duration-200 flex-1">
					{title}
				</h2>
			</div>
			<p className="font-eerie text-fog text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 group-hover:text-whisper transition-colors duration-200">
				{content}
			</p>
			{content.length > 100 && (
				<button
					type="button"
					onClick={onClick}
					className="inline-flex items-center gap-1 text-xs sm:text-sm text-pumpkin opacity-70 hover:opacity-100 hover:translate-x-1 transition-all duration-200 mb-3 font-eerie group/btn focus:outline-none focus:ring-2 focus:ring-pumpkin focus:ring-offset-2 focus:ring-offset-midnight rounded px-1"
					aria-label={`Read full story: ${title}`}
				>
					<span>Click to read more</span>
					<span className="group-hover/btn:translate-x-0.5 transition-transform duration-200">
						→
					</span>
				</button>
			)}
			<div className="border-t border-mist my-3"></div>
			<div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-xs mb-3">
				<span className="inline-flex items-center gap-1.5 bg-shadow px-2 py-1 rounded opacity-80 hover:opacity-100 transition-opacity">
					<User size={14} className="text-moonlight" aria-hidden="true" />
					By {author}
				</span>
				<span className="inline-flex items-center gap-1.5 text-moonlight opacity-70 hover:opacity-100 transition-opacity">
					<Calendar size={14} aria-hidden="true" />
					{formatDate(createdAt)}
				</span>
			</div>
			<div className="flex flex-wrap gap-1 sm:gap-2">
				{tags.map((tag, index) => (
					<span
						key={tag}
						className={`${tagColors[index % tagColors.length]} text-ghost px-2.5 py-1.5 rounded-sm text-xs whitespace-nowrap hover:opacity-90 transition-all duration-200 transform hover:-translate-y-1 hover:rotate-1 hover:shadow-lg cursor-default`}
					>
						#{tag}
					</span>
				))}
			</div>
		</article>
	);
};
