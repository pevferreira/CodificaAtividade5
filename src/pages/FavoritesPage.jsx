import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { getFavorites } from '../utils/localStorage';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFavorites(getFavorites());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h3" gutterBottom>
                    Meus Filmes Favoritos
                </Typography>

                {favorites.length === 0 ? (
                    <Typography textAlign="center" color="textSecondary">
                        Nenhum filme favoritado ainda.
                    </Typography>
                ) : (
                    <Grid container justifyContent="center">
                        {favorites.map(movie => (
                            <Grid item key={movie.id}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default FavoritesPage;