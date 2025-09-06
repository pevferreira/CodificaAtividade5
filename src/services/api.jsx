import axios from 'axios';

const API_KEY = 'colocar a chave pessoal para teste';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'pt-BR'
    }
});

export const searchMovies = (query, page = 1) =>
    api.get('/search/movie', { params: { query, page } });

export const getMovieDetails = (id) =>
    api.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
    api.get(`/movie/${id}/credits`);

export default api;

//