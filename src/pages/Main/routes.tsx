import { Route, Routes } from "react-router-dom";
import IndexPage from "./index";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
}

export default MainRoutes;
