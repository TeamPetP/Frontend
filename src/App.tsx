import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainRoutes from "./pages/Main/routes";
import MyPageRoutes from "./pages/MyPage/routes";
import AuthRoutes from "./pages/Auth/routes";
import Modal from "./modals";
import "./App.css";
import { AuthProvider } from "./contexts/UserContext";

function App() {
	return (
		<AuthProvider>
			<Navbar />
			<Routes>
				<Route path="/*" element={<MainRoutes />} />
				<Route path="/mypage/*" element={<MyPageRoutes />} />
				<Route path="/auth/*" element={<AuthRoutes />} />
			</Routes>
			<Modal />
		</AuthProvider>
	);
}

export default App;
