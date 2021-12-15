import { Button,  Divider, Input, List, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import MovieCard from '../components/movie-card'
import { fetchMovies, searchMovies, selectMoviesState } from '../redux/slices/moviesSlice'
import styles from './home.module.css'

const HomePage = () => {
	const [searchTerm, setSearchTerm] =  useState('')
	const [isSearchApplied, setIsSearchApplied] =  useState(false)
	const {
		movies,
		isFetching,
		totalResults
	} = useSelector(selectMoviesState)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchMovies())
	}, [dispatch])


	const onPageChange = page => {
		if (searchTerm) {
			dispatch(searchMovies({page, searchTerm}));
		} else {
			dispatch(fetchMovies(page));
		}
	}

	const onSearch = () => {
		setIsSearchApplied(true)
		dispatch(searchMovies({page: 1, searchTerm}))
	}
	const onSearchClear = () => {
		setSearchTerm('')
		setIsSearchApplied(false)
		dispatch(fetchMovies())
	}

	return (
		<div className={styles.homePage}>
			<div className={styles.container}>
				<div className={styles.searchInput}>
					<Input
						className={styles.input}
						placeholder='Search for movies'
						value={searchTerm}
						onChange={(e)=> setSearchTerm(e.target.value)}
						suffix={
							<Button
								type='primary'
								size='large'
								disabled={searchTerm.trim().length === 0}
								onClick={onSearch}
							>
								Search
							</Button>
						}
					/>
				</div>
				{
					isSearchApplied ?
						<Tag
							className={styles.searchedFor}
							visible={isSearchApplied}
							onClose={onSearchClear}
							closable
							color={'purple'}
						>
							You searched for: {searchTerm}
						</Tag>
						:
						null
				}
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
					pagination={{
						onChange: onPageChange,
						total: totalResults,
						pageSize: 20,
						showSizeChanger: false,
					}}
					dataSource={movies}
					renderItem={item => (
						<List.Item>
							<MovieCard movie={item} />
						</List.Item>
					)}
				/>
			</div>
		</div>
	)
}

export default HomePage
