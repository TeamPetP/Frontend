import { Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";

function AuthRoutes() {
	return (
		<Routes>
			<Route path="/signin" element={<SignIn />} />
		</Routes>
	);
}

export default AuthRoutes;
