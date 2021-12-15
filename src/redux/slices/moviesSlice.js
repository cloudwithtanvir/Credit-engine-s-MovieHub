import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../../utils/api'

const initialState = {
	movieDetails: {},
	movies: [],
	similarMovies: [],
	page: 1,
	totalResults: 0,
	isFetching: false,
}

export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (page = 1) => {
		const response = await API.getPopularMovies(page)
		return response.data
	}
)
export const fetchMovieDetail = createAsyncThunk(
	'movies/fetchMovieDetail',
	async (id) => {
		const response = await API.getMovieDetail(id)
		return response.data
	}
)

export const fetchSimilarMovie = createAsyncThunk(
	'movies/fetchSimilarMovies',
	async ({ id, page }) => {
		const response = await API.getSimilarMovies(id, page)
		return response.data
	}
)
export const searchMovies = createAsyncThunk(
	'movies/searchMovies',
	async ({ page, searchTerm }) => {
		const response = await API.searchMovies({ page, searchTerm })
		return response.data
	}
)

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.isFetching = true
			})
			.addCase(fetchMovies.fulfilled, (state, { payload }) => {
				const { page, results, total_results } = payload
				state.movies = results
				state.page = page
				state.totalResults = total_results
				state.isFetching = false
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.isFetching = false
			})
		builder
			.addCase(searchMovies.pending, (state) => {
				state.isFetching = true
			})
			.addCase(searchMovies.fulfilled, (state, { payload }) => {
				const { page, results, total_results } = payload
				state.movies = results
				state.page = page
				state.totalResults = total_results
				state.isFetching = false
			})
			.addCase(searchMovies.rejected, (state, action) => {
				state.isFetching = false
			})
		builder
			.addCase(fetchSimilarMovie.pending, (state) => {
				state.isFetching = true
			})
			.addCase(fetchSimilarMovie.fulfilled, (state, { payload }) => {
				const { page, results, total_results } = payload
				state.similarMovies = results
				state.page = page
				state.totalResults = total_results
				state.isFetching = false
			})
			.addCase(fetchSimilarMovie.rejected, (state, action) => {
				state.isFetching = false
			})
		builder
			.addCase(fetchMovieDetail.pending, (state) => {
				state.isFetching = true
			})
			.addCase(fetchMovieDetail.fulfilled, (state, { payload }) => {
				state.movieDetails[payload.id] = payload
				state.isFetching = false
			})
			.addCase(fetchMovieDetail.rejected, (state, action) => {
				state.isFetching = false
			})
	},
})

export const selectMoviesState = (state) => state.movies

export default moviesSlice.reducer
