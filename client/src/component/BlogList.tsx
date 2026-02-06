import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton, MobileStepper, useMediaQuery, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { colorPalette } from '../utils/cosmeticsHelper';
import { LazyImage } from './';
import { S3_BASE_URL, API_BASE_URL } from '../constant';

interface BlogPost {
	id: number;
	title: string;
	date: string;
	thumbnail: string;
	excerpt: string;
}

const useStyles = makeStyles({
    container: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
	sectionTitle: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '32px'
	},
	carouselContainer: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden'
	},
	carouselTrack: {
		display: 'flex',
		transition: 'transform 0.5s ease-in-out'
	},
	carouselSlide: {
		minWidth: '100%',
		padding: '0 16px',
		boxSizing: 'border-box'
	},
	slideContent: {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gap: '24px',
		padding: '8px 0',
		'@media (max-width: 600px)': {
			gridTemplateColumns: '1fr'
		}
	},
	blogCard: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
		}
	},
	blogThumbnail: {
		height: '180px',
		objectFit: 'cover'
	},
	blogCardContent: {
		flexGrow: 1
	},
	blogTitle: {
		color: colorPalette.PRIMARY,
		fontWeight: 600,
		marginBottom: '8px'
	},
	blogDate: {
		color: colorPalette.INFO,
		fontSize: '12px',
		marginBottom: '12px'
	},
	blogExcerpt: {
		color: colorPalette.INFO,
		lineHeight: 1.6
	},
	navigationContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	navButton: {
		color: colorPalette.PRIMARY
	},
	stepper: {
		justifyContent: 'center',
        '&&': {
            backgroundColor: colorPalette.TERTIARY
        },
		'& .MuiMobileStepper-dot': {
			backgroundColor: colorPalette.INFO
		},
		'& .MuiMobileStepper-dotActive': {
			backgroundColor: colorPalette.PRIMARY
		}
	}
});

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
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const itemsPerSlide = isMobile ? 1 : 3;
	const blogChunks = chunkArray(blogPosts, itemsPerSlide);
	const maxSteps = blogChunks.length;
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/blog-posts`)
			.then(response => {
				setBlogPosts(response.data.blogPosts);
				setTitle(response.data.title);
			})
			.catch(error => console.error('Error fetching blog posts:', error));
	}, []);

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
				{title}
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
											src={`${S3_BASE_URL}/${post.thumbnail}`}
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
