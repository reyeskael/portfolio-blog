import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';
import { S3_BASE_URL } from '../constant';

const useStyles = makeStyles({
	footer: {
		backgroundColor: colorPalette.PRIMARY,
		color: colorPalette.SECONDARY,
		padding: '24px 16px',
		textAlign: 'center'
	},
	socialLinks: {
		display: 'flex',
		justifyContent: 'center',
		gap: '8px',
		marginBottom: '16px'
	},
	icon: {
		width: '24px',
		height: '24px'
	}
});

interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

const socialLinks: SocialLink[] = [
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/in/michael-reyes-b41801194/',
		icon: `${S3_BASE_URL}/footer-icons/LinkedIn.svg`
	},
	{
		name: 'GitHub',
		url: 'https://github.com/reyeskael',
		icon: `${S3_BASE_URL}/footer-icons/GitHub.svg`
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/mchlrys.tsx',
		icon: `${S3_BASE_URL}/footer-icons/Instagram.svg`
	},
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/mchlrys.tsx',
		icon: `${S3_BASE_URL}/footer-icons/Facebook.svg`
	},
	{
		name: 'Email',
		url: 'mailto:michaelreyes0202@gmail.com',
		icon: `${S3_BASE_URL}/footer-icons/Email.svg`
	}
];

export const Footer = () => {
	const classes = useStyles();

	return (
		<Box id="contact" component="footer" className={classes.footer}>
			<Typography variant="h6">Michael Reyes, Web Developer</Typography>
			<Box className={classes.socialLinks}>
				{socialLinks.map((link) => (
					<IconButton
						key={link.name}
						href={link.url}
						target={link.name !== 'Email' ? '_blank' : undefined}
						aria-label={link.name}
					>
						<img src={link.icon} alt={link.name} className={classes.icon} />
					</IconButton>
				))}
			</Box>
			<Typography variant="body2">© 2026 All rights reserved.</Typography>
		</Box>
	);
};
