import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./screens/Dashboard";
import SignupPage from "./screens/Signup";
import SigninPage from "./screens/Signin";
import { RecoilRoot } from "recoil";

function App() {
	return (
		<RecoilRoot>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<DashboardPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/signin" element={<SigninPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</RecoilRoot>
	);
}

export default App;
