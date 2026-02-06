import { Box, Container } from '@mui/material';
import { Introduction, TechStack, BlogList, WorkExperience } from '../component';
import { usePageStyles } from '../styles';

export const MainPage: React.FC = () => {
	const classes = usePageStyles();

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
