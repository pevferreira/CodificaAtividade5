import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isFavorite, removeFavorite, saveFavorite } from '../utils/localStorage';

const MovieCard = ({ movie }) => {
    const [favorite, setFavorite] = useState(isFavorite(movie.id));

    const handleFavoriteClick = () => {
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            saveFavorite(movie);
        }
        setFavorite(!favorite);
    };

    return (
        <Card sx={{ maxWidth: 300, m: 1, position: 'relative' }}>
            <IconButton
                onClick={handleFavoriteClick}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.8)' }}
            >
                {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>

            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={movie.poster_path ?
                        `https://image.tmdb.org/t/p/w300${movie.poster_path}` :
                        '/placeholder-movie.jpg'}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
};

export default MovieCard;