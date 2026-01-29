import { Box, Card, CardContent, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';

import ReactIcon from '../assets/icons/React.svg';
import NodeIcon from '../assets/icons/Node.js.svg';
import JavaScriptIcon from '../assets/icons/JavaScript.svg';
import TypeScriptIcon from '../assets/icons/TypeScript.svg';
import HTML5Icon from '../assets/icons/HTML5.svg';
import MongoDBIcon from '../assets/icons/MongoDB.svg';

const useStyles = makeStyles({
    container: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
	title: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '24px',
	},
	techStack: {
		display: 'flex',
		justifyContent: 'center',
		gap: '24px',
		flexWrap: 'wrap',
	},
	card: {
		width: '120px',
		transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
		cursor: 'pointer',
		'&:hover': {
			transform: 'translateY(-8px)',
			boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
		},
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '24px 16px',
		'&:last-child': {
			paddingBottom: '24px',
		},
	},
	icon: {
		width: '48px',
		height: '48px',
		marginBottom: '12px',
	},
	techLabel: {
		fontSize: '14px',
		fontWeight: 500,
		color: colorPalette.PRIMARY,
		textAlign: 'center',
	},
});

const techStackItems = [
	{ name: 'React', icon: ReactIcon },
	{ name: 'Node.js', icon: NodeIcon },
	{ name: 'JavaScript', icon: JavaScriptIcon },
	{ name: 'TypeScript', icon: TypeScriptIcon },
	{ name: 'HTML5', icon: HTML5Icon },
	{ name: 'MongoDB', icon: MongoDBIcon },
];

export const TechStack = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container}>
			<Typography variant="h4" className={classes.title}>
				Tech Stack
			</Typography>
			<Box className={classes.techStack}>
				{techStackItems.map((tech) => (
					<Tooltip key={tech.name} title={tech.name} arrow>
						<Card className={classes.card} elevation={2}>
							<CardContent className={classes.cardContent}>
								<img src={tech.icon} alt={tech.name} className={classes.icon} />
								<Typography className={classes.techLabel}>{tech.name}</Typography>
							</CardContent>
						</Card>
					</Tooltip>
				))}
			</Box>
		</Box>
	);
};
