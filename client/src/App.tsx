import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AppLayout, Login, HomeLayout, Main, Dashboard, About, Notifications } from './pages';
import './App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Login />} />
				<Route path="home" element={<HomeLayout />}>
					<Route path="main" element={<Main />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="about" element={<About />} />
					</Route>
					<Route path="notifications" element={<Notifications />} />
				</Route>
				<Route path="*" element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App
