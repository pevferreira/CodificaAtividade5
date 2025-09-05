import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { searchMovies } from '../services/api';

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovies = async (searchQuery, pageNum = 1) => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setError('');
        try {
            const response = await searchMovies(searchQuery, pageNum);
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            setError('Erro ao buscar filmes. Verifique sua conexão.');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            fetchMovies(query, page);
        }
    }, [query, page]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <SearchBar onSearch={handleSearch} />

                {error && <ErrorMessage message={error} />}

                {loading && <Loader />}

                {!loading && movies.length > 0 && (
                    <>
                        <Grid container justifyContent="center">
                            {movies.map(movie => (
                                <Grid item key={movie.id}>
                                    <MovieCard movie={movie} />
                                </Grid>
                            ))}
                        </Grid>

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}

                {!loading && query && movies.length === 0 && (
                    <Typography textAlign="center" color="textSecondary">
                        Nenhum filme encontrado para "{query}"
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default SearchPage;