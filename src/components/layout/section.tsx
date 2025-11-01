import type { FC, ReactNode } from "react";

interface SectionProps {
	children: ReactNode;
	className?: string;
	variant?: "hero" | "card" | "cardBlood" | "plain";
	as?: "section" | "div" | "article";
	id?: string;
	ariaLabel?: string;
	testId?: string;
}

export const Section: FC<SectionProps> = ({
	children,
	className = "",
	variant = "plain",
	as: Component = "section",
	id,
	ariaLabel,
	testId,
}) => {
	const variantClasses = {
		hero: "text-center space-y-4",
		card: "bg-linear-to-br from-shadow to-midnight border border-mist rounded-lg p-6 md:p-8 shadow-deep",
		cardBlood:
			"bg-linear-to-br from-midnight to-shadow border border-blood rounded-lg p-6 md:p-8 shadow-deep",
		plain: "",
	};

	const baseClasses = variantClasses[variant];
	const combinedClasses = `${baseClasses} ${className}`.trim();

	return (
		<Component
			id={id}
			className={combinedClasses}
			aria-label={ariaLabel}
			data-testid={testId}
		>
			{children}
		</Component>
	);
};
