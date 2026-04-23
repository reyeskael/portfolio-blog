import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { colorPalette } from '../utils/cosmeticsHelper';

const useStyles = makeStyles({
	markdownContent: {
		'& h1, & h2, & h3, & h4, & h5, & h6': {
			color: colorPalette.PRIMARY,
			marginTop: '24px',
			marginBottom: '16px'
		},
		'& p': {
			color: colorPalette.INFO,
			lineHeight: 1.8,
			marginBottom: '16px'
		},
		'& a': {
			color: colorPalette.PRIMARY,
			textDecoration: 'underline'
		},
		'& ul, & ol': {
			color: colorPalette.INFO,
			paddingLeft: '24px',
			marginBottom: '16px'
		},
		'& li': {
			marginBottom: '8px',
			lineHeight: 1.6
		},
		'& blockquote': {
			borderLeft: `4px solid ${colorPalette.PRIMARY}`,
			paddingLeft: '16px',
			margin: '16px 0',
			color: colorPalette.INFO,
			fontStyle: 'italic'
		},
		'& code': {
			backgroundColor: colorPalette.TERTIARY,
			padding: '2px 6px',
			borderRadius: '4px',
			fontFamily: 'monospace'
		},
		'& pre': {
			backgroundColor: colorPalette.TERTIARY,
			padding: '16px',
			borderRadius: '8px',
			overflow: 'auto',
			'& code': {
				backgroundColor: 'transparent',
				padding: 0
			}
		},
		'& img': {
			maxWidth: '100%',
			height: 'auto',
			borderRadius: '8px'
		},
		'& table': {
			borderCollapse: 'collapse',
			width: '100%',
			margin: '16px 0',
			overflow: 'hidden'
		},
		'& th, & td': {
			border: `1px solid ${colorPalette.INFO}50`,
			padding: '10px 14px',
			textAlign: 'left'
		},
		'& th': {
			backgroundColor: `${colorPalette.PRIMARY}10`,
			fontWeight: 'bold',
			color: colorPalette.PRIMARY
		},
		'& td': {
			color: colorPalette.INFO
		},
		'& tr:nth-child(even)': {
			backgroundColor: `${colorPalette.TERTIARY}`
		}
	}
});

interface MarkdownRendererProps {
	content: string;
	className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
	const classes = useStyles();

	return (
		<Box className={`${classes.markdownContent} ${className || ''}`}>
			<Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
		</Box>
	);
};
