import { SxProps, Theme, createTheme } from "@mui/material";

export const colorPalette = {
	WHITE: "#FFFFFF",
	PRIMARY: "#404258",
	SECONDARY: "#50577A",
	INFO: "#6B728E"
};

export const customTheme: Theme = createTheme({
	palette: {
		primary: {
			main: colorPalette.PRIMARY,
			contrastText: colorPalette.WHITE
		},
		secondary: {
			main: colorPalette.SECONDARY,
			contrastText: colorPalette.WHITE
		},
		info: {
			main: colorPalette.INFO,
			contrastText: colorPalette.WHITE
		}
	}
});

export const pageContainer: SxProps = {
	bgcolor: colorPalette.WHITE
}
