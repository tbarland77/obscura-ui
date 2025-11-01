import type { FC } from "react";

type ObscuraLogoProps = {
	size?: number;
	className?: string;
};

export const ObscuraLogo: FC<ObscuraLogoProps> = ({
	size = 48,
	className = "",
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			role="img"
			aria-label="Obscura Logo - Ghost reading a book"
		>
			<title>Obscura Logo - Ghost reading a book</title>
			{/* Background dark circle */}
			<circle cx="50" cy="50" r="48" fill="#0b0c10" />

			{/* Moon in background */}
			<circle cx="70" cy="25" r="12" fill="#c0c0c0" opacity="0.3" />

			{/* Ghost body (larger, centered) */}
			<g transform="translate(50, 35)">
				{/* Main ghost shape with wavy bottom */}
				<path
					d="M -18 5 Q -18 -15 0 -15 Q 18 -15 18 5 L 18 25 Q 15 22 12 25 Q 9 22 6 25 Q 3 22 0 25 Q -3 22 -6 25 Q -9 22 -12 25 Q -15 22 -18 25 Z"
					fill="#f8f8ff"
					opacity="0.98"
				/>

				{/* Left eye (larger, rounder) */}
				<ellipse cx="-7" cy="-3" rx="3.5" ry="4.5" fill="#0b0c10" />
				<ellipse
					cx="-6"
					cy="-4"
					rx="1.2"
					ry="1.5"
					fill="#ff7518"
					opacity="0.9"
				/>
				<ellipse cx="-5.5" cy="-5" rx="0.6" ry="0.8" fill="#f8f8ff" />

				{/* Right eye (larger, rounder) */}
				<ellipse cx="7" cy="-3" rx="3.5" ry="4.5" fill="#0b0c10" />
				<ellipse
					cx="8"
					cy="-4"
					rx="1.2"
					ry="1.5"
					fill="#ff7518"
					opacity="0.9"
				/>
				<ellipse cx="8.5" cy="-5" rx="0.6" ry="0.8" fill="#f8f8ff" />

				{/* Happy reading smile */}
				<path
					d="M -6 5 Q 0 8 6 5"
					stroke="#0b0c10"
					strokeWidth="1.5"
					fill="none"
					strokeLinecap="round"
				/>

				{/* Rosy cheeks */}
				<ellipse cx="-12" cy="2" rx="3" ry="2" fill="#ff7518" opacity="0.2" />
				<ellipse cx="12" cy="2" rx="3" ry="2" fill="#ff7518" opacity="0.2" />
			</g>

			{/* Open book in front of ghost */}
			<g transform="translate(50, 65)">
				{/* Book shadow/base */}
				<ellipse cx="0" cy="8" rx="20" ry="3" fill="#0b0c10" opacity="0.2" />

				{/* Left page */}
				<path
					d="M -15 0 Q -15 -8 -8 -12 L 0 -12 L 0 5 L -8 8 Q -15 5 -15 0 Z"
					fill="#f8f8ff"
					stroke="#c0c0c0"
					strokeWidth="0.8"
				/>

				{/* Right page */}
				<path
					d="M 0 -12 L 8 -12 Q 15 -8 15 0 Q 15 5 8 8 L 0 5 Z"
					fill="#f8f8ff"
					stroke="#c0c0c0"
					strokeWidth="0.8"
				/>

				{/* Center spine */}
				<line x1="0" y1="-12" x2="0" y2="5" stroke="#d3d3d3" strokeWidth="1" />

				{/* Text lines on left page */}
				<line
					x1="-12"
					y1="-8"
					x2="-3"
					y2="-8"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="-12"
					y1="-5"
					x2="-3"
					y2="-5"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="-12"
					y1="-2"
					x2="-3"
					y2="-2"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="-12"
					y1="1"
					x2="-3"
					y2="1"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>

				{/* Text lines on right page */}
				<line
					x1="3"
					y1="-8"
					x2="12"
					y2="-8"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="3"
					y1="-5"
					x2="12"
					y2="-5"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="3"
					y1="-2"
					x2="12"
					y2="-2"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
				<line
					x1="3"
					y1="1"
					x2="12"
					y2="1"
					stroke="#ff7518"
					strokeWidth="0.5"
					opacity="0.6"
				/>
			</g>

			{/* Floating sparkles around the scene */}
			<circle cx="15" cy="30" r="2" fill="#ff7518" opacity="0.7" />
			<circle cx="85" cy="40" r="1.5" fill="#c0c0c0" opacity="0.6" />
			<circle cx="25" cy="70" r="1.2" fill="#ff7518" opacity="0.5" />
			<circle cx="80" cy="65" r="1.8" fill="#c0c0c0" opacity="0.5" />

			{/* Reading glow from book */}
			<ellipse cx="50" cy="65" rx="25" ry="15" fill="#ff7518" opacity="0.08" />
		</svg>
	);
};
