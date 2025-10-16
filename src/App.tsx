import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import MainLayout from "./routes/MainLayout";
import PreferenceDispersion from "./routes/PreferenceDispersion";
import Rssa from "./routes/Rssa";

function App() {
	return (
		<div className="App">
			<Router basename="/cybered/filter-bubbles-module/">
				<Routes>
					<Route path="/" element={<MainLayout />}>
						{/* Child routes */}
						<Route index element={<Home />} /> {/* `index` makes this the default child route */}
						<Route path="rssa" element={<Rssa />} />
						<Route path="dispersion" element={<PreferenceDispersion />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
