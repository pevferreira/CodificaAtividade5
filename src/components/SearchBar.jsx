import { Box, TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} mb={3}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar filmes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="large"
            />
        </Box>
    );
};

export default SearchBar;