import { Route, Routes } from "react-router-dom";
import IndexPage from "./PetpGram";
import PetMeetingPage from "./PetMeeting";
import PetMeetingCreatePage from "./PetMeeting/createMeeting";
import PetMeetinEditPage from "./PetMeeting/EditMeeting";
import PetMeetingDetailPage from "./PetMeeting/detailPage";
import JoinMembers from "../Main/PetMeeting/detailPage/JoinMembers";
import Map from "./Map";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/map" element={<Map />} />
      <Route path="/meeting" element={<PetMeetingPage />} />
      <Route path="/meeting/create" element={<PetMeetingCreatePage />} />
      <Route path="/meeting/detail" element={<PetMeetingDetailPage />} />
      <Route path="/meeting/edit" element={<PetMeetinEditPage />} />
      <Route path="/meeting/joinMembers" element={<JoinMembers />} />
    </Routes>
  );
}

export default MainRoutes;
