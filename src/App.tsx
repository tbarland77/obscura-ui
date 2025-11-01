import { Route, Routes } from "react-router-dom";
import { About } from "./pages/about";
import { Home } from "./pages/home";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{/* TODO: Create separate Stories page with filtering functionality */}
			<Route path="/stories" element={<Home />} />
			<Route path="/about" element={<About />} />
		</Routes>
	);
}
