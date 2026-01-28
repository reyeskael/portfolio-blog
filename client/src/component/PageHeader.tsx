import { Toolbar, Typography, AppBar, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	toolBar: {
		maxWidth: '1180px',
		margin: '0 auto',
		width: '100%',
	},
	typography: {
		flexGrow: 1
	}
});

interface MenuItem {
	text: string,
	link: string
}
interface PageHeaderProps {
	title: string,
	menuItems: MenuItem[]
}

export const PageHeader = ({title, menuItems}: PageHeaderProps) => {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar className={classes.toolBar}>
				<Typography variant="h6" className={classes.typography}>
					{title}
				</Typography>
				<Box>
					{menuItems.map((item) => (
						<Button variant="text" color="secondary" key={item.text}>{item.text}</Button>
					))}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
