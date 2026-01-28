import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { colorPalette } from '../utils/cosmeticsHelper';

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
	}
});

interface FooterProps {
	text?: string;
	linkedInUrl?: string;
	githubUrl?: string;
	instagramUrl?: string;
	facebookUrl?: string;
}

export const Footer = ({
	text = '© 2026 All rights reserved.',
	linkedInUrl = '#',
	githubUrl = '#',
	instagramUrl = '#',
	facebookUrl = '#',
}: FooterProps) => {
	const classes = useStyles();

	return (
		<Box component="footer" className={classes.footer}>
			<Typography variant="h6">Michael Reyes, Web Developer</Typography>
			<Box className={classes.socialLinks}>
				<IconButton
					color="secondary"
					href={linkedInUrl}
					target="_blank"
					aria-label="LinkedIn"
				>
					<LinkedInIcon />
				</IconButton>
				<IconButton
					color="secondary"
					href={githubUrl}
					target="_blank"
					aria-label="GitHub"
				>
					<GitHubIcon />
				</IconButton>
				<IconButton
					color="secondary"
					href={instagramUrl}
					target="_blank"
					aria-label="Instagram"
				>
					<InstagramIcon />
				</IconButton>
				<IconButton
					color="secondary"
					href={facebookUrl}
					target="_blank"
					aria-label="Facebook"
				>
					<FacebookIcon />
				</IconButton>
			</Box>
			<Typography variant="body2">{text}</Typography>
		</Box>
	);
};
