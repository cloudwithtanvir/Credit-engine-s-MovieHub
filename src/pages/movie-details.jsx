import { Divider, List } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/movie-card'
import { ImageSize } from '../constants'
import { fetchMovieDetail, fetchSimilarMovie, selectMoviesState } from '../redux/slices/moviesSlice'
import { getImageUrl } from '../utils'
import styles from './movie-details.module.css'

const MovieDetail = () => {
	const { id } = useParams()
	const { isFetching, movieDetails, similarMovies } = useSelector(selectMoviesState)
	const dispatch = useDispatch()
	const movieDetail = movieDetails[id]

	useEffect(() => {
		if (id) {
			dispatch(fetchMovieDetail(id))
			dispatch(fetchSimilarMovie({id, page: 1}))
		}
	}, [id, dispatch])

	if (!movieDetail) {
		return null
	}
	return (
		<div className={styles.movieDetailsPage}>
			<div style={{
				height: "600px",
				backgroundImage: `url(${getImageUrl({ size: ImageSize.BACKDROP, path: movieDetail.backdrop_path })})`
			}}>
				<div className={styles.backdrop}>
					<div className={styles.contents}>
						<img src={getImageUrl({ size: ImageSize.W300, path: movieDetail.poster_path })} alt={'...'} />
						<div className={styles.info}>
							<h3>{movieDetail.title} ({moment(movieDetail.release_date).format("YYYY")})</h3>
							<p>
								{
									movieDetail.genres.map(genre => (
										<span key={genre.id}>{genre.name}</span>
									))
								}
							</p>
							<p>Run Time: {movieDetail.runtime} mins</p>
							<h2>Overview</h2>
							<p>{movieDetail.overview}</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.container}>
				<h2>Similar Movies</h2>
				<div>
				<Divider/>
				<List
					loading={isFetching}
					grid={{
						gutter: 16,
						xs: 1,
						sm: 1,
						md: 2,
						lg: 2,
						xl: 3,
						xxl: 4,
						}}
					dataSource={similarMovies}
					renderItem={item => (
						<List.Item>
							<MovieCard movie={item} />
						</List.Item>
					)}
				/>			
				</div>
			</div>
		</div>
	)
}

export default MovieDetail
