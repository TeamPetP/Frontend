import { Route, Routes } from "react-router-dom";
import IndexPage from "./index";
import PetMeetingPage from "./petmeeting";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/meeting" element={<PetMeetingPage />} />
		</Routes>
	);
}

export default MainRoutes;
