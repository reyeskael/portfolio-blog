import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';
import { TechStack } from '../component/TechStack';
import { WorkExperience } from '../component/WorkExperience';
import ProfilePicture from '../assets/ProfilePicture.png';

const useStyles = makeStyles({
	container: {
		'&&': {
			maxWidth: '1000px',
		}
	},
	introSection: {
		paddingTop: '64px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	introContent: {
		flex: 1,
		textAlign: 'left',
	},
	profilePicture: {
		width: '250px',
		height: '250px',
		borderRadius: '50%',
		objectFit: 'cover',
		border: `4px solid ${colorPalette.PRIMARY}`,
		flexShrink: 0,
	},
	greeting: {
		color: colorPalette.PRIMARY
	},
	name: {
		color: colorPalette.PRIMARY,
		fontWeight: 700,
		marginBottom: '24px',
	},
	descriptionWrapper: {
		maxWidth: '600px',
	},
	description: {
		color: colorPalette.INFO,
		lineHeight: 1.8,
	},
});

export const MainPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Box className={classes.introSection}>
				<Box className={classes.introContent}>
					<Typography variant="h5" className={classes.greeting}>
						Hello, I'm
					</Typography>
					<Typography variant="h2" className={classes.name}>
						Michael Reyes
					</Typography>
					<Box className={classes.descriptionWrapper}>
						<Typography variant="body1" className={classes.description}>
							A software engineer with over 7 years of experience building modern web applications. 
							Specialized in full-stack development using React, Node.js, TypeScript, and cloud 
							technologies. Passionate about creating scalable, efficient, and user-friendly solutions.
						</Typography>
					</Box>
				</Box>
				<img
					src={ProfilePicture}
					alt="Michael Reyes"
					className={classes.profilePicture}
				/>
			</Box>
			<TechStack />

			<WorkExperience />
		</Container>
	);
}
