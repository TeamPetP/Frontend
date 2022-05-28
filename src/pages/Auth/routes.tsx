import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";

function AuthRoutes() {
	return (
		<Routes>
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	);
}

export default AuthRoutes;
