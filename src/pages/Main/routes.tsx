import { Route, Routes } from "react-router-dom";
import IndexPage from "./index";
import MainPage from "./MainPage";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
		</Routes>
	);
}

export default MainRoutes;
