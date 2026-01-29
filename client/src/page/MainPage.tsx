import { Box, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Introduction } from '../component/Introduction';
import { TechStack } from '../component/TechStack';
import { BlogList } from '../component/BlogList';
import { WorkExperience } from '../component/WorkExperience';
import { colorPalette } from '../utils';

const useStyles = makeStyles({
	page: {
		backgroundColor: colorPalette.TERTIARY,
		minHeight: '100vh',
		paddingTop: '64px',
	},
	container: {
		'&&': {
			display: 'flex',
			flexDirection: 'column',
			maxWidth: '1100px',
			gap: '48px',
		},
	},
});

export const MainPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Box id="home" className={classes.page}>
			<Container className={classes.container}>
				<Introduction />
				<TechStack />
				<BlogList />
				<WorkExperience />
			</Container>
		</Box>
	);
}
