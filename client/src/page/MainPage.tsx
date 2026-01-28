import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';
import { TechStack } from '../component/TechStack';
import { WorkExperience } from '../component/WorkExperience';

const useStyles = makeStyles({
	introSection: {
		padding: '64px 0',
		textAlign: 'center',
	},
	greeting: {
		color: colorPalette.PRIMARY,
		marginBottom: '16px',
	},
	name: {
		color: colorPalette.PRIMARY,
		fontWeight: 700,
		marginBottom: '24px',
	},
	descriptionWrapper: {
		maxWidth: '600px',
		margin: '0 auto',
	},
	description: {
		color: colorPalette.INFO,
		lineHeight: 1.8,
		textAlign: 'center',
	},
});

export const MainPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className="pageContainerWithHeader">
			<Box className={classes.introSection}>
				<Typography variant="h5" className={classes.greeting}>
					Hello, I'm
				</Typography>
				<Typography variant="h2" className={classes.name}>
					Michael Reyes
				</Typography>
				<Box className={classes.descriptionWrapper}>
					<Typography variant="body1" className={classes.description}>
						A 27-year-old software engineer passionate about building modern web applications. 
						I specialize in creating elegant, efficient, and user-friendly solutions using 
						cutting-edge technologies.
					</Typography>
				</Box>
				<TechStack />
			</Box>

			<WorkExperience />
		</Container>
	);
}
