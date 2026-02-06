import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';

export const usePageStyles = makeStyles({
    page: {
        backgroundColor: colorPalette.TERTIARY,
        minHeight: '100vh',
        paddingTop: '64px'
    },
    container: {
        '&&': {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1100px',
            gap: '48px'
        }
    }
});
