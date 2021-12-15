import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: '8b261f419e2ebd8dff2de15121b8d6f1',
	},
})

const getPopularMovies = (page = 1) => {
	return api.get('/movie/popular', {
		params: {
			page,
		},
	})
}

const searchMovies = ({ page, searchTerm }) => {
	return api.get('/search/movie', {
		params: {
			page,
			query: searchTerm,
		},
	})
}

export const API = {
	getPopularMovies,
	searchMovies,
}
