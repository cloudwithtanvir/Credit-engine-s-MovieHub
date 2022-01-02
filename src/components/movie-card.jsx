import { Card } from 'antd'
import moment from 'moment'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ImageSize } from '../constants'

const getPoster = (path) => {
	return <img
		style={{
			objectFit: 'contain'
		}}
		alt='...'
		src={`https://image.tmdb.org//t/p/${ImageSize.W300}${path}`}
	/>
}

const MovieCard = ({ movie, onClick }) => {
	const navigate = useNavigate()
	const onCardClick = (id) => {
		navigate(`/${id}`)
	}

	return (
		<Card
			onClick={() => onCardClick(movie.id)}
			hoverable={true}
			style={{ width: '300px'}}
			cover={getPoster(movie.poster_path)}
		>
			<Card.Meta
				title={movie.title}
				description={moment(movie.release_date).format("MMM DD, YYYY")}
			/>
		</Card>
	)
}

export default MovieCard
