import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Introduction } from '../component/Introduction';
import { TechStack } from '../component/TechStack';
import { WorkExperience } from '../component/WorkExperience';

const useStyles = makeStyles({
	container: {
		'&&': {
			display: 'flex',
			flexDirection: 'column',
			maxWidth: '1000px',
			gap: '48px',
		},
	},
});

export const MainPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<Introduction />
			<TechStack />
			<WorkExperience />
		</Container>
	);
}
