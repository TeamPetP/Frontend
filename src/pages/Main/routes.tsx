import { Route, Routes } from "react-router-dom";
import IndexPage from "./PetpGram";
import PetMeetingPage from "./PetMeeting";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/meeting" element={<PetMeetingPage />} />
		</Routes>
	);
}

export default MainRoutes;
