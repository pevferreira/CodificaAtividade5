import axios from 'axios';

const API_KEY = 'c368bf9df1ba52d897321d4daadfc86b';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'pt-BR'
    }
});

// Funções para buscar dados
export const searchMovies = (query, page = 1) =>
    api.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (id) =>
    api.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
    api.get(`/movie/${id}/credits`);

export default api;

