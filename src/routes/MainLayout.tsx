import React from "react";
import { Link, Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<header className="bg-white shadow-md">
				<nav className="container mx-auto px-6 py-3">
					<div className="flex items-center justify-between">
						<Link to="/" className="text-xl font-semibold text-gray-700">
							Filter Bubbles
						</Link>
						<div className="flex items-center space-x-4">
							<Link to="/" className="text-gray-600 hover:text-indigo-600">
								Home
							</Link>
							<Link to="/rssa" className="text-gray-600 hover:text-indigo-600">
								Recommender
							</Link>
							<Link to="/dispersion" className="text-gray-600 hover:text-indigo-600">
								DispersionSim
							</Link>
						</div>
					</div>
				</nav>
			</header>

			<main className="flex-grow container mx-auto p-6">
				<Outlet />
			</main>

			<footer className="bg-white">
				<div className="container mx-auto px-6 py-4 ">
					<p className="text-start text-gray-500">
						{new Date().getFullYear()} CyberEd Project (NSF: 2039616), Clemson University
					</p>
				</div>
			</footer>
		</div>
	);
};

export default MainLayout;
