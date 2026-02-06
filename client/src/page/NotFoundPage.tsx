import { Container, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { colorPalette } from '../utils/cosmeticsHelper';
import { usePageStyles } from '../styles';

const useStyles = makeStyles({
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '60vh',
		textAlign: 'center'
	},
	errorCode: {
		color: colorPalette.PRIMARY,
		fontSize: '120px',
		fontWeight: 700,
		lineHeight: 1,
		marginBottom: '16px'
	},
	title: {
		color: colorPalette.PRIMARY,
		marginBottom: '16px'
	},
	description: {
		color: colorPalette.INFO,
		marginBottom: '32px',
		maxWidth: '400px'
	},
	button: {
		'&&': {
			backgroundColor: colorPalette.PRIMARY,
			color: colorPalette.SECONDARY,
			'&:hover': {
				backgroundColor: colorPalette.INFO
			}
		}
	}
});

export const NotFoundPage: React.FC = () => {
	const pageClasses = usePageStyles();
	const classes = useStyles();
	const navigate = useNavigate();

	return (
		<Box className={pageClasses.page}>
			<Container className={pageClasses.container}>
				<Box className={classes.content}>
					<Typography className={classes.errorCode}>
						404
					</Typography>
					<Typography variant="h4" className={classes.title}>
						Page Not Found
					</Typography>
					<Typography variant="body1" className={classes.description}>
						The page you're looking for doesn't exist or has been moved.
					</Typography>
					<Button
						variant="contained"
						className={classes.button}
						onClick={() => navigate('/')}
					>
						Go Back Home
					</Button>
				</Box>
			</Container>
		</Box>
	);
};
