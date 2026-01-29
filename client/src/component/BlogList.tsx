import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';

import SagadaThumbnail from '../assets/blog/sagada/small/Sagada.jpg';
import TaiwanThumbnail from '../assets/blog/taiwan/small/JiufenTaiwan.jpg';
import MMAGymThumbnail from '../assets/blog/boxing-and-muay-thai/small/MMAGym.jpg';

const useStyles = makeStyles({
	sectionTitle: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '32px',
	},
	blogGrid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
		gap: '24px',
	},
	blogCard: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
		},
	},
	blogThumbnail: {
		height: '180px',
		objectFit: 'cover',
	},
	blogCardContent: {
		flexGrow: 1,
	},
	blogTitle: {
		color: colorPalette.PRIMARY,
		fontWeight: 600,
		marginBottom: '8px',
	},
	blogDate: {
		color: colorPalette.INFO,
		fontSize: '12px',
		marginBottom: '12px',
	},
	blogExcerpt: {
		color: colorPalette.INFO,
		lineHeight: 1.6,
	},
});

const blogPosts = [
	{
		id: 1,
		title: 'My First Solo Travel: Sagada Adventure',
		date: 'August 2022',
		thumbnail: SagadaThumbnail,
		excerpt: 'Embarking on my first solo adventure to Sagada, I booked everything myself - transportation, hotel, and tours. With little prior knowledge of what to expect, I explored this mountain province blindly, discovering its breathtaking caves, hanging coffins, and stunning sunrise views. A DIY trip that taught me independence and the joy of spontaneous exploration.',
	},
	{
		id: 2,
        title: 'Starting My Fitness Journey: Boxing & Muay Thai',
		date: 'March 2025',
		thumbnail: MMAGymThumbnail,
		excerpt: 'As a software engineer, sitting for the majority of my day became the norm. To break this sedentary lifestyle, I enrolled in an MMA gym to learn boxing and muay thai. Beyond staying active, training has become my outlet for releasing stress and clearing my mind. It\'s been an incredible journey of discipline, physical growth, and mental resilience.',
	},
	{
		id: 3,
		title: 'First International Trip: Exploring Taiwan',
		date: 'November 2025',
		thumbnail: TaiwanThumbnail,
		excerpt: 'My first international travel experience with my girlfriend took us to Taiwan. We explored famous tourist spots in Taipei, indulged in local cuisine and street food delights. Our first day was a DIY adventure, while the second and third days were guided tours booked through Klook, giving us the perfect mix of spontaneity and convenience.',
	},
];

export const BlogList = () => {
	const classes = useStyles();

	return (
		<Box>
			<Typography variant="h4" className={classes.sectionTitle}>
				Blog
			</Typography>
			<Box className={classes.blogGrid}>
				{blogPosts.map((post) => (
					<Card key={post.id} className={classes.blogCard} elevation={2}>
						<CardMedia
							component="img"
							image={post.thumbnail}
							alt={post.title}
							className={classes.blogThumbnail}
						/>
						<CardContent className={classes.blogCardContent}>
							<Typography variant="h6" className={classes.blogTitle}>
								{post.title}
							</Typography>
							<Typography className={classes.blogDate}>
								{post.date}
							</Typography>
							<Typography variant="body2" className={classes.blogExcerpt}>
								{post.excerpt}
							</Typography>
						</CardContent>
					</Card>
				))}
			</Box>
		</Box>
	);
};
