import { useState } from 'react';
import {
	Toolbar,
	Typography,
	AppBar,
	Button,
	Box,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	toolBar: {
		maxWidth: '1180px',
		margin: '0 auto',
		width: '100%',
		'&&': {
			padding: 0
		}
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingLeft: 16,
		paddingRight: 16
	},
	drawer: {
		width: 250
	},
});

interface MenuItem {
	text: string;
	link: string;
}
interface HeaderProps {
	title: string;
	menuItems: MenuItem[];
}

export const Header = ({ title, menuItems }: HeaderProps) => {
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
	};

	return (
		<AppBar position="static">
			<Toolbar className={classes.toolBar}>
				<Box className={classes.container}>
					<Typography variant="h6">
						{title}
					</Typography>
					{isMobile ? (
						<>
							<IconButton
								color="secondary"
								onClick={toggleDrawer(true)}
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor="right"
								open={drawerOpen}
								onClose={toggleDrawer(false)}
							>
								<Box
									className={classes.drawer}
									role="presentation"
									onClick={toggleDrawer(false)}
								>
									<List>
										{menuItems.map((item) => (
											<ListItem key={item.text} disablePadding>
												<ListItemButton>
													<ListItemText primary={item.text} />
												</ListItemButton>
											</ListItem>
										))}
									</List>
								</Box>
							</Drawer>
						</>
					) : (
						<Box>
							{menuItems.map((item) => (
								<Button variant="text" color="secondary" key={item.text}>
									{item.text}
								</Button>
							))}
						</Box>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};
