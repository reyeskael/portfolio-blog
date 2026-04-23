import { useState } from 'react';
import {
	Container,
	Typography,
	Box,
	TextField,
	Button,
	Paper
} from '@mui/material';
import {
	Code,
	ContentCopy,
	Delete
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { RichTextEditor } from '../component';
import { colorPalette } from '../utils/cosmeticsHelper';
import { usePageStyles } from '../styles';

const useStyles = makeStyles({
	title: {
		color: colorPalette.PRIMARY,
		marginBottom: '24px'
	},
	mainContainer: {
		display: 'flex',
		gap: '24px',
		'@media (max-width: 1200px)': {
			flexDirection: 'column'
		}
	},
	editorContainer: {
		flex: 3
	},
	sidebarContainer: {
		flex: 1,
		minWidth: '280px',
		maxWidth: '320px'
	},
	metadataCard: {
		padding: '24px',
		marginBottom: '16px'
	},
	metadataTitle: {
		color: colorPalette.PRIMARY,
		marginBottom: '16px',
		fontWeight: 600
	},
	textField: {
		'&&': {
			marginBottom: '20px'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: colorPalette.INFO
			},
			'&:hover fieldset': {
				borderColor: colorPalette.PRIMARY
			},
			'&.Mui-focused fieldset': {
				borderColor: colorPalette.PRIMARY
			}
		},
		'& .MuiInputLabel-root': {
			color: colorPalette.INFO
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color: colorPalette.PRIMARY
		},
		'& .MuiInputBase-input': {
			color: colorPalette.PRIMARY
		}
	},
	outputCard: {
		padding: '20px'
	},
	outputTitle: {
		color: colorPalette.PRIMARY,
		marginBottom: '16px',
		fontWeight: 600
	},
	outputBox: {
		backgroundColor: '#f5f5f5',
		padding: '16px',
		borderRadius: '8px',
		overflow: 'auto',
		maxHeight: '200px',
		marginBottom: '16px'
	},
	outputCode: {
		fontFamily: 'monospace',
		fontSize: '12px',
		whiteSpace: 'pre-wrap',
		wordBreak: 'break-word',
		color: colorPalette.PRIMARY
	},
	buttonContainer: {
		display: 'flex',
		gap: '12px',
		flexWrap: 'wrap'
	},
	primaryButton: {
		'&&': {
			backgroundColor: colorPalette.PRIMARY,
			color: colorPalette.SECONDARY,
			'&:hover': {
				backgroundColor: colorPalette.INFO
			}
		}
	},
	secondaryButton: {
		'&&': {
			borderColor: colorPalette.PRIMARY,
			color: colorPalette.PRIMARY,
			'&:hover': {
				borderColor: colorPalette.INFO,
				backgroundColor: 'transparent'
			}
		}
	},
	dangerButton: {
		'&&': {
			borderColor: '#d32f2f',
			color: '#d32f2f',
			'&:hover': {
				backgroundColor: '#d32f2f10'
			}
		}
	}
});

export const CreateBlogPage: React.FC = () => {
	const pageClasses = usePageStyles();
	const classes = useStyles();
	
	const [formData, setFormData] = useState({
		id: '',
		title: '',
		date: '',
		thumbnail: ''
	});
	const [markdownContent, setMarkdownContent] = useState('');
	const [showOutput, setShowOutput] = useState(false);

	const handleMetadataChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[field]: e.target.value
		}));
	};

	const handleEditorChange = (_html: string, markdown: string) => {
		setMarkdownContent(markdown);
	};

	const generateOutput = () => {
		const output = {
			id: parseInt(formData.id) || 0,
			title: formData.title,
			date: formData.date,
			thumbnail: formData.thumbnail,
			content: markdownContent
		};
		return JSON.stringify(output, null, 4);
	};

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(generateOutput());
	};

	const handleClear = () => {
		setFormData({
			id: '',
			title: '',
			date: '',
			thumbnail: ''
		});
		setMarkdownContent('');
		setShowOutput(false);
		// Reload page to reset editor
		window.location.reload();
	};

	return (
		<Box className={pageClasses.page}>
			<Container className={pageClasses.container} style={{ maxWidth: '1400px' }}>
				<Typography variant="h4" className={classes.title}>
					Create Blog Post
				</Typography>

				<Box className={classes.mainContainer}>
					{/* Editor Section */}
					<Box className={classes.editorContainer}>
						<RichTextEditor
							content=""
							onChange={handleEditorChange}
							placeholder="Start writing your blog post..."
						/>
					</Box>

					{/* Sidebar */}
					<Box className={classes.sidebarContainer}>
						{/* Metadata */}
						<Paper className={classes.metadataCard} elevation={2}>
							<Typography variant="subtitle1" className={classes.metadataTitle}>
								Post Details
							</Typography>
							<TextField
								label="ID"
								type="number"
								value={formData.id}
								onChange={handleMetadataChange('id')}
								className={classes.textField}
								fullWidth
								size="small"
							/>
							<TextField
								label="Title"
								value={formData.title}
								onChange={handleMetadataChange('title')}
								className={classes.textField}
								fullWidth
								size="small"
							/>
							<TextField
								label="Date"
								placeholder="e.g., January 2026"
								value={formData.date}
								onChange={handleMetadataChange('date')}
								className={classes.textField}
								fullWidth
								size="small"
							/>
							<TextField
								label="Thumbnail Path"
								placeholder="e.g., blog/post/small/image.jpg"
								value={formData.thumbnail}
								onChange={handleMetadataChange('thumbnail')}
								className={classes.textField}
								fullWidth
								size="small"
								style={{ marginBottom: 0 }}
							/>
						</Paper>

						{/* Output */}
						<Paper className={classes.outputCard} elevation={2}>
							<Typography variant="subtitle1" className={classes.outputTitle}>
								Export
							</Typography>
							
							{showOutput && (
								<Box className={classes.outputBox}>
									<code className={classes.outputCode}>
										{generateOutput()}
									</code>
								</Box>
							)}

							<Box className={classes.buttonContainer}>
								<Button
									variant="contained"
									className={classes.primaryButton}
									onClick={() => setShowOutput(true)}
									startIcon={<Code />}
								>
									Generate
								</Button>
								{showOutput && (
									<Button
										variant="outlined"
										className={classes.secondaryButton}
										onClick={handleCopyToClipboard}
										startIcon={<ContentCopy />}
									>
										Copy
									</Button>
								)}
								<Button
									variant="outlined"
									className={classes.dangerButton}
									onClick={handleClear}
									startIcon={<Delete />}
								>
									Clear
								</Button>
							</Box>
						</Paper>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
