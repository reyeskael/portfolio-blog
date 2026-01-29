import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';
import { LazyImage } from './LazyImage';
import ProfilePicture from '../assets/profile/small/ProfilePicture.png';

const useStyles = makeStyles({
	introSection: {
		paddingTop: '64px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	introSectionMobile: {
		paddingTop: '64px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
	},
	introContent: {
		flex: 1,
		textAlign: 'left',
	},
	introContentMobile: {
		textAlign: 'center',
	},
	profilePicture: {
		width: '250px',
		height: '250px',
		borderRadius: '50%',
		objectFit: 'cover',
		border: `4px solid ${colorPalette.PRIMARY}`,
		flexShrink: 0,
	},
	profilePictureMobile: {
		width: '180px',
		height: '180px',
		borderRadius: '50%',
		objectFit: 'cover',
		border: `4px solid ${colorPalette.PRIMARY}`,
		marginBottom: '24px',
	},
	greeting: {
		color: colorPalette.PRIMARY,
	},
	name: {
		color: colorPalette.PRIMARY,
		fontWeight: 700,
		marginBottom: '24px',
	},
	descriptionWrapper: {
		maxWidth: '600px',
	},
	descriptionWrapperMobile: {
		maxWidth: '100%',
	},
	description: {
		color: colorPalette.INFO,
		lineHeight: 1.8,
	},
});

export const Introduction = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Box className={isMobile ? classes.introSectionMobile : classes.introSection}>
			{isMobile && (
				<LazyImage
					src={ProfilePicture}
					alt="Michael Reyes"
					className={classes.profilePictureMobile}
					variant="circular"
				/>
			)}
			<Box className={isMobile ? classes.introContentMobile : classes.introContent}>
				<Typography variant="h5" className={classes.greeting}>
					Hello, I'm
				</Typography>
				<Typography variant={isMobile ? 'h3' : 'h2'} className={classes.name}>
					Michael Reyes
				</Typography>
				<Box className={isMobile ? classes.descriptionWrapperMobile : classes.descriptionWrapper}>
					<Typography variant="body1" className={classes.description}>
						A software engineer with over 7 years of experience building modern web applications. 
						Specialized in full-stack development using React, Node.js, TypeScript, and cloud 
						technologies. Passionate about creating scalable, efficient, and user-friendly solutions.
					</Typography>
				</Box>
			</Box>
			{!isMobile && (
				<LazyImage
					src={ProfilePicture}
					alt="Michael Reyes"
					className={classes.profilePicture}
					variant="circular"
				/>
			)}
		</Box>
	);
};
