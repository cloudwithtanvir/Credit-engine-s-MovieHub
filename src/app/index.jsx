import { Layout } from 'antd';
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home'
import MovieDetailsPage from '../pages/movie-details';
const { Content, Header } = Layout;

function App() {
	return (
		<Layout>
			<Header
				style={{ background: '#02303d'}}
			>
				<Link to={'/'}>
					<h3 style={{
						color: 'white',
						cursor: 'pointer'
					}}>Credit Engine's MovieHub</h3>
				</Link>
			</Header>
			<Content>
				<Routes>
					<Route exact path='/' element={<HomePage/>} />
					<Route exact path='/:id' element={<MovieDetailsPage/>} />
				</Routes>
			</Content>
		</Layout>
	)
}

export default App
