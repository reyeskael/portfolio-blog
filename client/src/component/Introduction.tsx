import { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import axios from 'axios';
import { colorPalette } from '../utils/cosmeticsHelper';
import { LazyImage } from './LazyImage';
import { S3_BASE_URL, API_BASE_URL } from '../constant';

interface ProfileData {
	name: string;
	greeting: string;
	title: string;
	description: string;
	profilePicture: string;
}

const useStyles = makeStyles({
	'@keyframes slideInFromLeft': {
		'0%': {
			transform: 'translateX(-100vw)',
			opacity: 0
		},
		'100%': {
			transform: 'translateX(0)',
			opacity: 1
		}
	},
	'@keyframes slideInFromRight': {
		'0%': {
			transform: 'translateX(100vw)',
			opacity: 0
		},
		'100%': {
			transform: 'translateX(0)',
			opacity: 1
		}
	},
	'@keyframes slideInFromTop': {
		'0%': {
			transform: 'translateY(-100vh)',
			opacity: 0
		},
		'100%': {
			transform: 'translateY(0)',
			opacity: 1
		}
	},
	introSection: {
		paddingTop: '34px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	introSectionMobile: {
		paddingTop: '34px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center'
	},
	introContent: {
		flex: 1,
		textAlign: 'left',
		opacity: 0
	},
	introContentAnimated: {
		flex: 1,
		textAlign: 'left',
		opacity: 0,
		animation: '$slideInFromLeft 1.8s ease-out forwards'
	},
	introContentMobile: {
		textAlign: 'center',
		opacity: 0
	},
	introContentMobileAnimated: {
		textAlign: 'center',
		opacity: 0,
		animation: '$slideInFromLeft 1.8s ease-out forwards'
	},
	profilePictureWrapper: {
		flexShrink: 0,
		opacity: 0
	},
	profilePictureWrapperAnimated: {
		flexShrink: 0,
		opacity: 0,
		animation: '$slideInFromRight 1.8s ease-out 0.2s forwards'
	},
	profilePictureWrapperMobile: {
		marginBottom: '24px',
		opacity: 0
	},
	profilePictureWrapperMobileAnimated: {
		marginBottom: '24px',
		opacity: 0,
		animation: '$slideInFromTop 1.8s ease-out forwards'
	},
	profilePicture: {
		width: '250px',
		height: '250px',
		borderRadius: '50%',
		objectFit: 'cover',
		border: `4px solid ${colorPalette.PRIMARY}`
	},
	profilePictureMobile: {
		width: '180px',
		height: '180px',
		borderRadius: '50%',
		objectFit: 'cover',
		border: `4px solid ${colorPalette.PRIMARY}`
	},
	greeting: {
		color: colorPalette.PRIMARY
	},
	name: {
		color: colorPalette.PRIMARY,
		fontWeight: 700,
		marginBottom: '24px'
	},
	descriptionWrapper: {
		maxWidth: '600px'
	},
	descriptionWrapperMobile: {
		maxWidth: '100%'
	},
	description: {
		color: colorPalette.INFO,
		lineHeight: 1.8
	}
});

export const Introduction = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [isVisible, setIsVisible] = useState(false);
	const [profile, setProfile] = useState<ProfileData | null>(null);

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/profile`)
			.then(response => setProfile(response.data))
			.catch(error => console.error('Error fetching profile:', error));
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	if (!profile) return null;

	return (
		<Box className={classNames({
			[classes.introSectionMobile]: isMobile,
			[classes.introSection]: !isMobile
		})}>
			{isMobile && (
				<Box className={classNames({
					[classes.profilePictureWrapperMobileAnimated]: isVisible,
					[classes.profilePictureWrapperMobile]: !isVisible
				})}>
					<LazyImage
						src={`${S3_BASE_URL}/${profile.profilePicture}`}
						alt={profile.name}
						className={classes.profilePictureMobile}
						variant="circular"
					/>
				</Box>
			)}
			<Box className={classNames({
				[classes.introContentMobileAnimated]: isMobile && isVisible,
				[classes.introContentMobile]: isMobile && !isVisible,
				[classes.introContentAnimated]: !isMobile && isVisible,
				[classes.introContent]: !isMobile && !isVisible
			})}>
				<Typography variant="h5" className={classes.greeting}>
					{profile.greeting}
				</Typography>
				<Typography variant={isMobile ? 'h3' : 'h2'} className={classes.name}>
					{profile.name}
				</Typography>
				<Box className={classNames({
					[classes.descriptionWrapperMobile]: isMobile,
					[classes.descriptionWrapper]: !isMobile
				})}>
					<Typography variant="body1" className={classes.description}>
						{profile.description}
					</Typography>
				</Box>
			</Box>
			{!isMobile && (
				<Box className={classNames({
					[classes.profilePictureWrapperAnimated]: isVisible,
					[classes.profilePictureWrapper]: !isVisible
				})}>
					<LazyImage
						src={`${S3_BASE_URL}/${profile.profilePicture}`}
						alt={profile.name}
						className={classes.profilePicture}
						variant="circular"
					/>
				</Box>
			)}
		</Box>
	);
};
