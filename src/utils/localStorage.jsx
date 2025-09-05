export const saveFavorite = (movie) => {
    const favorites = getFavorites();
    if (!favorites.find(fav => fav.id === movie.id)) {
        localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
};

export const removeFavorite = (movieId) => {
    const favorites = getFavorites();
    localStorage.setItem('favorites',
        JSON.stringify(favorites.filter(movie => movie.id !== movieId))
    );
};

export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const isFavorite = (movieId) => {
    return getFavorites().some(movie => movie.id === movieId);
};