import { Box, Container, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';

import ReactIcon from '../assets/icons/React.svg';
import NodeIcon from '../assets/icons/Node.js.svg';
import JavaScriptIcon from '../assets/icons/JavaScript.svg';
import TypeScriptIcon from '../assets/icons/TypeScript.svg';
import HTML5Icon from '../assets/icons/HTML5.svg';
import MongoDBIcon from '../assets/icons/MongoDB.svg';

const useStyles = makeStyles({
	introSection: {
		padding: '64px 0',
		textAlign: 'center',
	},
	greeting: {
		color: colorPalette.PRIMARY,
		marginBottom: '16px',
	},
	name: {
		color: colorPalette.PRIMARY,
		fontWeight: 700,
		marginBottom: '24px',
	},
	descriptionWrapper: {
		maxWidth: '600px',
		margin: '0 auto',
	},
	description: {
		color: colorPalette.INFO,
		lineHeight: 1.8,
		textAlign: 'center',
	},
	techStack: {
		display: 'flex',
		justifyContent: 'center',
		gap: '24px',
		marginTop: '32px',
		flexWrap: 'wrap',
	},
	techIcon: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '8px',
		transition: 'transform 0.2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.1)',
		},
	},
	icon: {
		width: '48px',
		height: '48px',
	},
	techLabel: {
		fontSize: '12px',
		color: colorPalette.INFO,
	},
});

const techStack = [
	{ name: 'React', icon: ReactIcon },
	{ name: 'Node.js', icon: NodeIcon },
	{ name: 'JavaScript', icon: JavaScriptIcon },
	{ name: 'TypeScript', icon: TypeScriptIcon },
	{ name: 'HTML5', icon: HTML5Icon },
	{ name: 'MongoDB', icon: MongoDBIcon },
];

export const MainPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className="pageContainerWithHeader">
			<Box className={classes.introSection}>
				<Typography variant="h5" className={classes.greeting}>
					Hello, I'm
				</Typography>
				<Typography variant="h2" className={classes.name}>
					Michael Reyes
				</Typography>
				<Box className={classes.descriptionWrapper}>
					<Typography variant="body1" className={classes.description}>
						A 27-year-old software engineer passionate about building modern web applications. 
						I specialize in creating elegant, efficient, and user-friendly solutions using 
						cutting-edge technologies.
					</Typography>
				</Box>
				<Box className={classes.techStack}>
					{techStack.map((tech) => (
						<Tooltip key={tech.name} title={tech.name} arrow>
							<Box className={classes.techIcon}>
								<img src={tech.icon} alt={tech.name} className={classes.icon} />
								<span className={classes.techLabel}>{tech.name}</span>
							</Box>
						</Tooltip>
					))}
				</Box>
			</Box>
		</Container>
	);
}
