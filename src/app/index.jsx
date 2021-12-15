import { Layout } from 'antd';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home'
const { Content } = Layout;

function App() {
	return (
		<Layout>
			<Content>
				<Routes>
					<Route exact path='/' element={<HomePage/>} />
				</Routes>
			</Content>
		</Layout>
	)
}

export default App
