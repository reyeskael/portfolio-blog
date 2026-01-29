import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton, MobileStepper, useMediaQuery, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';
import { LazyImage } from './';

import SagadaThumbnail from '../assets/blog/sagada/small/Sagada.jpg';
import PulagThumbnail from '../assets/blog/pulag/small/Pulag.jpg';
import TreePlantingThumbnail from '../assets/blog/tree-planting-puray/small/TreePlantingPuray.jpg';
import BuscalanThumbnail from '../assets/blog/buscalan/small/ApoWhangOd.jpg';
import TaiwanThumbnail from '../assets/blog/taiwan/small/JiufenTaiwan.jpg';
import MMAGymThumbnail from '../assets/blog/boxing-and-muay-thai/small/MMAGym.jpg';

const useStyles = makeStyles({
    container: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
	sectionTitle: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '32px',
	},
	carouselContainer: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
	},
	carouselTrack: {
		display: 'flex',
		transition: 'transform 0.5s ease-in-out',
	},
	carouselSlide: {
		minWidth: '100%',
		padding: '0 16px',
		boxSizing: 'border-box',
	},
	slideContent: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '24px',
		padding: '8px 0',
		'@media (max-width: 600px)': {
			gridTemplateColumns: '1fr',
		},
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
	navigationContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navButton: {
		color: colorPalette.PRIMARY,
	},
	stepper: {
		justifyContent: 'center',
        '&&': {
            backgroundColor: colorPalette.TERTIARY,
        },
		'& .MuiMobileStepper-dot': {
			backgroundColor: colorPalette.INFO,
		},
		'& .MuiMobileStepper-dotActive': {
			backgroundColor: colorPalette.PRIMARY,
		},
	},
});

const blogPosts = [
	{
		id: 1,
		title: 'First International Trip: Exploring Taiwan',
		date: 'November 2025',
		thumbnail: TaiwanThumbnail,
		excerpt: 'My first international travel experience with my girlfriend took us to Taiwan. We explored famous tourist spots in Taipei, indulged in local cuisine and street food delights. Our first day was a DIY adventure, while the second and third days were guided tours booked through Klook, giving us the perfect mix of spontaneity and convenience.',
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
		title: 'I Got Inked by Apo Whang-od',
		date: 'November 2024',
		thumbnail: BuscalanThumbnail,
		excerpt: 'A memorable journey with my girlfriend to Buscalan, a small mountain village home to the Butbut tribe. We immersed ourselves in their rich culture and had the once-in-a-lifetime experience of getting tattooed by the legendary Apo Whang-od, the oldest traditional tattoo artist in the Philippines. A trip that left a permanent mark, both on our skin and in our hearts.',
	},
	{
		id: 4,
		title: 'Planting Trees for Mother Nature',
		date: 'October 2024',
		thumbnail: TreePlantingThumbnail,
		excerpt: 'Volunteering to plant trees in Puray, Rodriguez, Rizal with my girlfriend and our environmental group NSMN (Newborn Steward for Mother Nature). As an advocate for saving our nature, this wasn\'t my first tree planting activity, but every opportunity to give back to the environment is meaningful. It\'s always fulfilling to contribute to reforestation and inspire others to care for our planet.',
	},
	{
		id: 5,
		title: 'Playground of the Gods',
		date: 'April 2023',
		thumbnail: PulagThumbnail,
		excerpt: 'Hiking Mount Pulag with my girlfriend - a beginner-friendly mountain that the 18KM trek makes harder than it seems. We started our adventure at 1AM and reached the summit around 9AM. The exhausting climb was absolutely worth it when we witnessed the breathtaking view from the top, standing among the clouds in the Philippines\' third highest peak.',
	},
	{
		id: 6,
		title: 'My First Solo Travel: Sagada Adventure',
		date: 'August 2022',
		thumbnail: SagadaThumbnail,
		excerpt: 'Embarking on my first solo adventure to Sagada, I booked everything myself - transportation, hotel, and tours. With little prior knowledge of what to expect, I explored this mountain province blindly, discovering its breathtaking caves, hanging coffins, and stunning sunrise views. A DIY trip that taught me independence and the joy of spontaneous exploration.',
	},
];

const chunkArray = <T,>(array: T[], size: number): T[][] => {
	const chunks: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push(array.slice(i, i + size));
	}
	return chunks;
};

export const BlogList = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [activeStep, setActiveStep] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const itemsPerSlide = isMobile ? 1 : 3;
	const blogChunks = chunkArray(blogPosts, itemsPerSlide);
	const maxSteps = blogChunks.length;

	useEffect(() => {
		setActiveStep(0);
	}, [isMobile]);

	useEffect(() => {
		if (isPaused) return;

		const timer = setInterval(() => {
			setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
		}, 5000);

		return () => clearInterval(timer);
	}, [maxSteps, isPaused]);

	const handleMouseEnter = () => {
		setIsPaused(true);
	};

	const handleMouseLeave = () => {
		setIsPaused(false);
	};

	const handleNext = () => {
		setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
	};

	const handleBack = () => {
		setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
	};

	return (
		<Box className={classes.container} id="blog">
			<Typography variant="h4" className={classes.sectionTitle}>
				Blog
			</Typography>
			<Box className={classes.carouselContainer}>
				<Box
					className={classes.carouselTrack}
					style={{ transform: `translateX(-${activeStep * 100}%)` }}
				>
					{blogChunks.map((chunk, index) => (
						<Box key={index} className={classes.carouselSlide}>
							<Box className={classes.slideContent}>
								{chunk.map((post) => (
									<Card 
										key={post.id} 
										className={classes.blogCard} 
										elevation={2}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										<LazyImage
											src={post.thumbnail}
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
					))}
				</Box>
			</Box>
			<Box className={classes.navigationContainer}>
				<IconButton onClick={handleBack} className={classes.navButton}>
					<KeyboardArrowLeft />
				</IconButton>
				<MobileStepper
					steps={maxSteps}
					position="static"
					activeStep={activeStep}
					className={classes.stepper}
					backButton={null}
					nextButton={null}
				/>
				<IconButton onClick={handleNext} className={classes.navButton}>
					<KeyboardArrowRight />
				</IconButton>
			</Box>
		</Box>
	);
};
