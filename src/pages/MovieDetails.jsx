import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Card,
    CardMedia,
    Chip,
    Container,
    Grid,
    IconButton,
    Rating,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { getMovieCredits, getMovieDetails } from '../services/api';
import { isFavorite, removeFavorite, saveFavorite } from '../utils/localStorage';
const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [detailsResponse, creditsResponse] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id)
                ]);

                setMovie(detailsResponse.data);
                setCredits(creditsResponse.data);
                setFavorite(isFavorite(id));
            } catch (err) {
                setError('Erro ao carregar detalhes do filme');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleFavoriteToggle = () => {
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            saveFavorite(movie);
        }
        setFavorite(!favorite);
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return <div>Filme não encontrado</div>;

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <IconButton>
                        <ArrowBackIcon /> Voltar
                    </IconButton>
                </Link>

                <Grid container spacing={4} mt={2}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={movie.poster_path ?
                                    `https://image.tmdb.org/t/p/w400${movie.poster_path}` :
                                    '/placeholder-movie.jpg'}
                                alt={movie.title}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography variant="h3" gutterBottom>
                                {movie.title}
                            </Typography>

                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
                                <Typography>({movie.vote_average}/10)</Typography>
                                <IconButton onClick={handleFavoriteToggle} color={favorite ? 'error' : 'default'}>
                                    {favorite ? '❤️' : '🤍'}
                                </IconButton>
                            </Box>

                            <Typography variant="body1" paragraph>
                                {movie.overview || 'Sinopse não disponível.'}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2">Data de Lançamento</Typography>
                                    <Typography>{movie.release_date || 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2">Duração</Typography>
                                    <Typography>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">Gêneros</Typography>
                                    <Box>
                                        {movie.genres?.map(genre => (
                                            <Chip key={genre.id} label={genre.name} sx={{ m: 0.5 }} />
                                        ))}
                                    </Box>
                                </Grid>
                            </Grid>

                            {credits && (
                                <Box mt={3}>
                                    <Typography variant="h6" gutterBottom>Elenco Principal</Typography>
                                    <Box>
                                        {credits.cast.slice(0, 10).map(actor => (
                                            <Chip
                                                key={actor.id}
                                                label={actor.name}
                                                variant="outlined"
                                                sx={{ m: 0.5 }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default MovieDetails;