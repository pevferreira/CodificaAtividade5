import { AppBar, Button, Container, Toolbar } from '@mui/material';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetails from './pages/MovieDetails';
import SearchPage from './pages/SearchPage';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Buscar Filmes
                    </Button>
                    <Button color="inherit" component={Link} to="/favorites">
                        Favoritos
                    </Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;