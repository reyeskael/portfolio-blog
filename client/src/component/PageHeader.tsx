import { Toolbar, Typography, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

interface PageHeaderProps {
	title: string,
	onMenuToggle?: () => void
}

export const PageHeader = ({title, onMenuToggle}: PageHeaderProps) => {
	return (
		<AppBar position="static" className='pageHeader'>
			<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
					onClick={ onMenuToggle }
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
