import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { colorPalette } from '../utils/cosmeticsHelper';
import { S3_BASE_URL, API_BASE_URL } from '../constant';

interface TechStackItem {
	name: string;
	icon: string;
}

const useStyles = makeStyles({
	'@keyframes fadeInUp': {
		'0%': {
			transform: 'translateY(30px)',
			opacity: 0
		},
		'100%': {
			transform: 'translateY(0)',
			opacity: 1
		}
	},
    container: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
	title: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '24px'
	},
	techStack: {
		display: 'flex',
		justifyContent: 'center',
		gap: '24px',
		flexWrap: 'wrap'
	},
	card: {
		width: '120px',
		transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
		cursor: 'pointer',
		opacity: 0,
		animation: '$fadeInUp 0.5s ease-out forwards',
		'&:hover': {
			transform: 'translateY(-8px)',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
		}
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '24px 16px',
		'&:last-child': {
			paddingBottom: '24px'
		}
	},
	icon: {
		width: '48px',
		height: '48px',
		marginBottom: '12px'
	},
	techLabel: {
		fontSize: '14px',
		fontWeight: 500,
		color: colorPalette.PRIMARY,
		textAlign: 'center'
	}
});

export const TechStack = () => {
	const classes = useStyles();
	const [techStackItems, setTechStackItems] = useState<TechStackItem[]>([]);
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/tech-stack`)
			.then(response => {
				setTechStackItems(response.data.techStack);
				setTitle(response.data.title);
			})
			.catch(error => console.error('Error fetching tech stack:', error));
	}, []);

	return (
		<Box className={classes.container}>
			<Typography variant="h4" className={classes.title}>
				{title}
			</Typography>
			<Box className={classes.techStack}>
				{techStackItems.map((tech, index) => (
					<Tooltip key={tech.name} title={tech.name} arrow>
						<Card 
							className={classes.card} 
							elevation={2}
							style={{ animationDelay: `${index * 150}ms` }}
						>
							<CardContent className={classes.cardContent}>
								<img src={`${S3_BASE_URL}/${tech.icon}`} alt={tech.name} className={classes.icon} />
								<Typography className={classes.techLabel}>{tech.name}</Typography>
							</CardContent>
						</Card>
					</Tooltip>
				))}
			</Box>
		</Box>
	);
};
