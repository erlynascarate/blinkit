import { Routes, Route, useLocation } from "react-router";
import Header from "./components/Header"
import Home from "./pages/Home"
import Products from "./pages/Products";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

function App() {
	const location = useLocation()
	const isLoginRoute = location.pathname === "/login"
	const isRegisterRoute = location.pathname === "/register"
	const backgroundLocation = location.state?.backgroundLocation
	const modalBackgroundLocation = backgroundLocation || (isLoginRoute || isRegisterRoute ? { ...location, pathname: "/" } : null)

	return (
		<>
		<Header />

		{/* Use the background page for modal routing, and fall back to the real location for normal navigation. */}
		<Routes location={modalBackgroundLocation || location}>
			<Route path="/" element={<Home />} />
			<Route path="/products" element={<Products />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<Register />} />
		</Routes>

		{(isLoginRoute || isRegisterRoute) && (
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		)}
		
		<Footer />
		</>
	)
}

export default App
