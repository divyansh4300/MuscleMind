import { Route, Routes, Navigate } from "react-router-dom";
import Main from "../src/components/Main/index";
import Signup from "../src/components/Signup/index";
import Login from "../src/components/Login/index";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;