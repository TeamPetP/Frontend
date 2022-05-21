import { Route, Routes } from "react-router-dom";
import IndexPage from "./PetpGram";
import PetMeetingPage from "./PetMeeting";
import PetMeetingCreatePage from "./PetMeeting/createMeeting";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/meeting" element={<PetMeetingPage />} />
			<Route path="/meeting/create" element={<PetMeetingCreatePage />} />
		</Routes>
	);
}

export default MainRoutes;
