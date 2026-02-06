import { Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MarkdownRenderer } from '../component';
import { colorPalette } from '../utils/cosmeticsHelper';
import { usePageStyles } from '../styles';

const useStyles = makeStyles({
	title: {
		color: colorPalette.PRIMARY,
		marginBottom: '24px'
	}
});

interface BlogPageProps {
	title?: string;
	content?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({ title, content }) => {
	const pageClasses = usePageStyles();
	const classes = useStyles();

	const sampleMarkdown = `
# Welcome to My Blog

This is a sample blog post rendered using **Markdown**.

## Features

- Easy to write and read
- Supports **bold** and *italic* text
- Code blocks with syntax highlighting

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote for highlighting important information.

### Links and Images

Visit [my portfolio](/) to learn more about me.
`;

	return (
		<Box className={pageClasses.page}>
			<Container className={pageClasses.container}>
				{title && (
					<Typography variant="h4" className={classes.title}>
						{title}
					</Typography>
				)}
				<MarkdownRenderer content={content || sampleMarkdown} />
			</Container>
		</Box>
	);
};
