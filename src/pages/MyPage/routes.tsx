import { Route, Routes } from "react-router-dom";
import IndexPage from "./index";
import AlrimPage from "./Alrim";
import MyMeetPage from "./MyMeet";
import AttentionMeetPage from "./AttentionMeet";

function MyPageRoutes() {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />
			<Route path="/alrim" element={<AlrimPage />} />
			<Route path="/myMeet" element={<MyMeetPage />} />
			<Route path="/attentionMeet" element={<AttentionMeetPage />} />
		</Routes>
	);
}

export default MyPageRoutes;
