import { Alert, Box } from '@mui/material';

const ErrorMessage = ({ message }) => (
    <Box my={2}>
        <Alert severity="error">{message || 'Erro ao carregar dados. Tente novamente.'}</Alert>
    </Box>
);

export default ErrorMessage;