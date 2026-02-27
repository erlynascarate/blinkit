import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header"
import Home from "./pages/Home"
import Products from "./pages/Products";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
	const location = useLocation()
	const isLoginRoute = location.pathname === "/login"
	const backgroundLocation = location.state?.backgroundLocation
	const modalBackgroundLocation = backgroundLocation || (isLoginRoute ? { ...location, pathname: "/" } : null)

	return (
		<>
		<Header />

		{/* Use the background page for modal routing, and fall back to the real location for normal navigation. */}
		<Routes location={modalBackgroundLocation || location}>
			<Route path="/" element={<Home />} />
			<Route path="/products" element={<Products />} />
			<Route path="/login" element={<Login />} />
		</Routes>

		{isLoginRoute && (
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>
		)}
		
		<Footer />
		</>
	)
}

export default App
