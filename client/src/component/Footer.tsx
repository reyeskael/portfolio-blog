import { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { colorPalette } from '../utils/cosmeticsHelper';
import { S3_BASE_URL, API_BASE_URL } from '../constant';

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
	target?: string;
	icon: string;
}

export const Footer = () => {
	const classes = useStyles();
	const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
	const [title, setTitle] = useState<string>('');
	const [copyright, setCopyright] = useState<string>('');

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/footer`)
			.then(response => {
				setSocialLinks(response.data.socialLinks);
				setCopyright(response.data.copyright);
				setTitle(response.data.title);
			})
			.catch(error => console.error('Error fetching footer:', error));
	}, []);


	return (
		<Box id="contact" component="footer" className={classes.footer}>
			<Typography variant="h6">{title}</Typography>
			<Box className={classes.socialLinks}>
				{socialLinks.map((link) => (
					<IconButton
						key={link.name}
						href={link.url}
						target={link.target}
						aria-label={link.name}
					>
						<img src={`${S3_BASE_URL}/${link.icon}`} alt={link.name} className={classes.icon} />
					</IconButton>
				))}
			</Box>
			<Typography variant="body2">{copyright}</Typography>
		</Box>
	);
};
