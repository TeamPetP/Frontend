import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainRoutes from "./pages/Main/routes";
import MyPageRoutes from "./pages/MyPage/routes";
import "./App.css";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/*" element={<MainRoutes />} />
					<Route path="/mypage" element={<MyPageRoutes />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
