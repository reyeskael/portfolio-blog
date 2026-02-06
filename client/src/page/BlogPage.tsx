import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { MarkdownRenderer } from '../component';
import { colorPalette } from '../utils/cosmeticsHelper';
import { usePageStyles } from '../styles';
import { API_BASE_URL } from '../constant';

const useStyles = makeStyles({
	title: {
		color: colorPalette.PRIMARY,
		marginBottom: '8px'
	},
	date: {
		color: colorPalette.INFO,
		marginBottom: '24px'
	},
	loadingContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '50vh'
	},
	errorMessage: {
		color: colorPalette.INFO,
		textAlign: 'center'
	}
});

interface BlogPageData {
	id: number;
	title: string;
	date: string;
	thumbnail: string;
	content: string;
}

export const BlogPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const pageClasses = usePageStyles();
	const classes = useStyles();
	const [blogData, setBlogData] = useState<BlogPageData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			setError('No blog post selected');
			return;
		}

		axios.get(`${API_BASE_URL}/api/blog-page/${id}`)
			.then(response => {
				setBlogData(response.data);
				setLoading(false);
			})
			.catch(() => {
				setError('Blog post not found');
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return (
			<Box className={pageClasses.page}>
				<Container className={pageClasses.container}>
					<Box className={classes.loadingContainer}>
						<CircularProgress />
					</Box>
				</Container>
			</Box>
		);
	}

	if (error || !blogData) {
		return (
			<Box className={pageClasses.page}>
				<Container className={pageClasses.container}>
					<Typography variant="h5" className={classes.errorMessage}>
						{error || 'Blog post not found'}
					</Typography>
				</Container>
			</Box>
		);
	}

	return (
		<Box className={pageClasses.page}>
			<Container className={pageClasses.container}>
				<Typography variant="h4" className={classes.title}>
					{blogData.title}
				</Typography>
				<Typography variant="body2" className={classes.date}>
					{blogData.date}
				</Typography>
				<MarkdownRenderer content={blogData.content} />
			</Container>
		</Box>
	);
};
