import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import {
	Box,
	IconButton,
	Tooltip,
	Divider,
	ToggleButton,
	ToggleButtonGroup,
	Menu,
	MenuItem
} from '@mui/material';
import {
	FormatBold,
	FormatItalic,
	FormatStrikethrough,
	Code,
	FormatQuote,
	FormatListBulleted,
	FormatListNumbered,
	Link as LinkIcon,
	Image as ImageIcon,
	Undo,
	Redo,
	TableChart,
	AddBox,
	IndeterminateCheckBox,
	DeleteOutline
} from '@mui/icons-material';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { colorPalette } from '../utils/cosmeticsHelper';

const useStyles = makeStyles({
	editorContainer: {
		border: `1px solid ${colorPalette.INFO}50`,
		borderRadius: '8px',
		overflow: 'hidden'
	},
	toolbar: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: '4px',
		padding: '8px 12px',
		borderBottom: `1px solid ${colorPalette.INFO}30`,
		backgroundColor: '#fafafa'
	},
	toolbarGroup: {
		display: 'flex',
		alignItems: 'center',
		gap: '2px'
	},
	toolbarDivider: {
		height: '24px',
		margin: '0 8px'
	},
	toolbarButton: {
		'&&': {
			padding: '6px',
			color: colorPalette.INFO,
			'&:hover': {
				backgroundColor: `${colorPalette.PRIMARY}15`,
				color: colorPalette.PRIMARY
			}
		}
	},
	toolbarButtonActive: {
		'&&': {
			padding: '6px',
			backgroundColor: `${colorPalette.PRIMARY}20`,
			color: colorPalette.PRIMARY,
			'&:hover': {
				backgroundColor: `${colorPalette.PRIMARY}30`
			}
		}
	},
	headingSelect: {
		'& .MuiToggleButton-root': {
			padding: '4px 8px',
			fontSize: '12px',
			color: colorPalette.INFO,
			borderColor: `${colorPalette.INFO}50`,
			'&.Mui-selected': {
				backgroundColor: `${colorPalette.PRIMARY}20`,
				color: colorPalette.PRIMARY
			}
		}
	},
	editorContent: {
		padding: '16px',
		minHeight: '400px',
		backgroundColor: '#fff',
		'& .ProseMirror': {
			outline: 'none',
			minHeight: '368px',
			'& > * + *': {
				marginTop: '0.75em'
			},
			'& h1': {
				fontSize: '2em',
				fontWeight: 'bold',
				color: colorPalette.PRIMARY,
				marginTop: '1em',
				marginBottom: '0.5em'
			},
			'& h2': {
				fontSize: '1.5em',
				fontWeight: 'bold',
				color: colorPalette.PRIMARY,
				marginTop: '1em',
				marginBottom: '0.5em'
			},
			'& h3': {
				fontSize: '1.25em',
				fontWeight: 'bold',
				color: colorPalette.PRIMARY,
				marginTop: '1em',
				marginBottom: '0.5em'
			},
			'& p': {
				color: colorPalette.INFO,
				lineHeight: 1.8
			},
			'& ul, & ol': {
				paddingLeft: '24px',
				color: colorPalette.INFO
			},
			'& li': {
				marginBottom: '4px'
			},
			'& blockquote': {
				borderLeft: `4px solid ${colorPalette.PRIMARY}`,
				paddingLeft: '16px',
				marginLeft: 0,
				color: colorPalette.INFO,
				fontStyle: 'italic'
			},
			'& code': {
				backgroundColor: '#f5f5f5',
				padding: '2px 6px',
				borderRadius: '4px',
				fontFamily: 'monospace',
				fontSize: '0.9em'
			},
			'& pre': {
				backgroundColor: '#f5f5f5',
				padding: '16px',
				borderRadius: '8px',
				overflow: 'auto',
				'& code': {
					backgroundColor: 'transparent',
					padding: 0
				}
			},
			'& a': {
				color: colorPalette.PRIMARY,
				textDecoration: 'underline',
				cursor: 'pointer'
			},
			'& img': {
				maxWidth: '100%',
				height: 'auto',
				borderRadius: '8px'
			},
			'& hr': {
				border: 'none',
				borderTop: `1px solid ${colorPalette.INFO}30`,
				margin: '1em 0'
			},
			'& p.is-editor-empty:first-child::before': {
				content: 'attr(data-placeholder)',
				float: 'left',
				color: '#adb5bd',
				pointerEvents: 'none',
				height: 0
			},
			'& table': {
				borderCollapse: 'collapse',
				width: '100%',
				margin: '1em 0',
				overflow: 'hidden'
			},
			'& th, & td': {
				border: `1px solid ${colorPalette.INFO}50`,
				padding: '8px 12px',
				textAlign: 'left',
				minWidth: '100px'
			},
			'& th': {
				backgroundColor: `${colorPalette.PRIMARY}10`,
				fontWeight: 'bold',
				color: colorPalette.PRIMARY
			},
			'& td': {
				color: colorPalette.INFO
			},
			'& .selectedCell': {
				backgroundColor: `${colorPalette.PRIMARY}20`
			}
		}
	}
});

interface RichTextEditorProps {
	content: string;
	onChange: (html: string, markdown: string) => void;
	placeholder?: string;
}

const htmlToMarkdown = (html: string): string => {
	let markdown = html;
	
	// Headers
	markdown = markdown.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
	markdown = markdown.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
	markdown = markdown.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
	
	// Bold and Italic
	markdown = markdown.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
	markdown = markdown.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
	markdown = markdown.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
	markdown = markdown.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
	markdown = markdown.replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~');
	
	// Code
	markdown = markdown.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');
	markdown = markdown.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
	
	// Links and Images
	markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');
	markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
	markdown = markdown.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)');
	markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');
	
	// Lists
	markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, content) => {
		return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
	});
	markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, content) => {
		let index = 1;
		return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${index++}. $1\n`) + '\n';
	});
	
	// Blockquote
	markdown = markdown.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) => {
		const lines = content.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1').split('\n');
		return lines.map((line: string) => `> ${line.trim()}`).join('\n') + '\n\n';
	});

	// Tables
	markdown = markdown.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
		const rows: string[] = [];
		const rowMatches = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
		
		rowMatches.forEach((row: string, rowIndex: number) => {
			const cells: string[] = [];
			const cellMatches = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
			
			cellMatches.forEach((cell: string) => {
				const cellContent = cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi, '$1')
					.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1')
					.replace(/<[^>]+>/g, '')
					.trim();
				cells.push(cellContent);
			});
			
			rows.push('| ' + cells.join(' | ') + ' |');
			
			// Add separator after header row
			if (rowIndex === 0) {
				rows.push('| ' + cells.map(() => '---').join(' | ') + ' |');
			}
		});
		
		return rows.join('\n') + '\n\n';
	});
	
	// Paragraphs and line breaks
	markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
	markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
	markdown = markdown.replace(/<hr\s*\/?>/gi, '\n---\n\n');
	
	// Clean up remaining HTML tags
	markdown = markdown.replace(/<[^>]+>/g, '');
	
	// Clean up extra whitespace
	markdown = markdown.replace(/\n{3,}/g, '\n\n');
	markdown = markdown.trim();
	
	return markdown;
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
	content,
	onChange,
	placeholder = 'Start writing...'
}) => {
	const classes = useStyles();
	const [tableMenuAnchor, setTableMenuAnchor] = useState<null | HTMLElement>(null);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3]
				}
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'editor-link'
				}
			}),
		Image.configure({
			HTMLAttributes: {
				class: 'editor-image'
			}
		}),
		Table.configure({
			resizable: true
		}),
		TableRow,
		TableHeader,
		TableCell
	],
		content: content,
		editorProps: {
			attributes: {
				'data-placeholder': placeholder
			}
		},
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			const markdown = htmlToMarkdown(html);
			onChange(html, markdown);
		}
	});

	if (!editor) {
		return null;
	}

	const addLink = () => {
		const url = window.prompt('Enter URL:');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	const addImage = () => {
		const url = window.prompt('Enter image URL:');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const handleTableMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setTableMenuAnchor(event.currentTarget);
	};

	const handleTableMenuClose = () => {
		setTableMenuAnchor(null);
	};

	const insertTable = () => {
		editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
		handleTableMenuClose();
	};

	const addColumnBefore = () => {
		editor.chain().focus().addColumnBefore().run();
		handleTableMenuClose();
	};

	const addColumnAfter = () => {
		editor.chain().focus().addColumnAfter().run();
		handleTableMenuClose();
	};

	const deleteColumn = () => {
		editor.chain().focus().deleteColumn().run();
		handleTableMenuClose();
	};

	const addRowBefore = () => {
		editor.chain().focus().addRowBefore().run();
		handleTableMenuClose();
	};

	const addRowAfter = () => {
		editor.chain().focus().addRowAfter().run();
		handleTableMenuClose();
	};

	const deleteRow = () => {
		editor.chain().focus().deleteRow().run();
		handleTableMenuClose();
	};

	const deleteTable = () => {
		editor.chain().focus().deleteTable().run();
		handleTableMenuClose();
	};

	return (
		<Box className={classes.editorContainer}>
			<Box className={classes.toolbar}>
				<Box className={classes.toolbarGroup}>
					<ToggleButtonGroup
						size="small"
						exclusive
						value={
							editor.isActive('heading', { level: 1 }) ? '1' :
							editor.isActive('heading', { level: 2 }) ? '2' :
							editor.isActive('heading', { level: 3 }) ? '3' : ''
						}
						onChange={(_, value) => {
							if (value) {
								editor.chain().focus().toggleHeading({ level: parseInt(value) as 1 | 2 | 3 }).run();
							}
						}}
						className={classes.headingSelect}
					>
						<ToggleButton value="1">H1</ToggleButton>
						<ToggleButton value="2">H2</ToggleButton>
						<ToggleButton value="3">H3</ToggleButton>
					</ToggleButtonGroup>
				</Box>

				<Divider orientation="vertical" className={classes.toolbarDivider} />

				<Box className={classes.toolbarGroup}>
					<Tooltip title="Bold">
						<IconButton
							className={editor.isActive('bold') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<FormatBold fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Italic">
						<IconButton
							className={editor.isActive('italic') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<FormatItalic fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Strikethrough">
						<IconButton
							className={editor.isActive('strike') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleStrike().run()}
						>
							<FormatStrikethrough fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>

				<Divider orientation="vertical" className={classes.toolbarDivider} />

				<Box className={classes.toolbarGroup}>
					<Tooltip title="Code">
						<IconButton
							className={editor.isActive('code') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleCode().run()}
						>
							<Code fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Blockquote">
						<IconButton
							className={editor.isActive('blockquote') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
						>
							<FormatQuote fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>

				<Divider orientation="vertical" className={classes.toolbarDivider} />

				<Box className={classes.toolbarGroup}>
					<Tooltip title="Bullet List">
						<IconButton
							className={editor.isActive('bulletList') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleBulletList().run()}
						>
							<FormatListBulleted fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Numbered List">
						<IconButton
							className={editor.isActive('orderedList') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
						>
							<FormatListNumbered fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>

				<Divider orientation="vertical" className={classes.toolbarDivider} />

				<Box className={classes.toolbarGroup}>
					<Tooltip title="Link">
						<IconButton
							className={editor.isActive('link') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={addLink}
						>
							<LinkIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Image">
						<IconButton
							className={classes.toolbarButton}
							onClick={addImage}
						>
							<ImageIcon fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Table">
						<IconButton
							className={editor.isActive('table') ? classes.toolbarButtonActive : classes.toolbarButton}
							onClick={handleTableMenuOpen}
						>
							<TableChart fontSize="small" />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={tableMenuAnchor}
						open={Boolean(tableMenuAnchor)}
						onClose={handleTableMenuClose}
					>
						<MenuItem onClick={insertTable}>
							<AddBox fontSize="small" style={{ marginRight: 8 }} />
							Insert Table (3x3)
						</MenuItem>
						<Divider />
						<MenuItem onClick={addColumnBefore} disabled={!editor.isActive('table')}>
							<AddBox fontSize="small" style={{ marginRight: 8 }} />
							Add Column Before
						</MenuItem>
						<MenuItem onClick={addColumnAfter} disabled={!editor.isActive('table')}>
							<AddBox fontSize="small" style={{ marginRight: 8 }} />
							Add Column After
						</MenuItem>
						<MenuItem onClick={deleteColumn} disabled={!editor.isActive('table')}>
							<IndeterminateCheckBox fontSize="small" style={{ marginRight: 8 }} />
							Delete Column
						</MenuItem>
						<Divider />
						<MenuItem onClick={addRowBefore} disabled={!editor.isActive('table')}>
							<AddBox fontSize="small" style={{ marginRight: 8 }} />
							Add Row Before
						</MenuItem>
						<MenuItem onClick={addRowAfter} disabled={!editor.isActive('table')}>
							<AddBox fontSize="small" style={{ marginRight: 8 }} />
							Add Row After
						</MenuItem>
						<MenuItem onClick={deleteRow} disabled={!editor.isActive('table')}>
							<IndeterminateCheckBox fontSize="small" style={{ marginRight: 8 }} />
							Delete Row
						</MenuItem>
						<Divider />
						<MenuItem onClick={deleteTable} disabled={!editor.isActive('table')}>
							<DeleteOutline fontSize="small" style={{ marginRight: 8 }} />
							Delete Table
						</MenuItem>
					</Menu>
				</Box>

				<Divider orientation="vertical" className={classes.toolbarDivider} />

				<Box className={classes.toolbarGroup}>
					<Tooltip title="Undo">
						<IconButton
							className={classes.toolbarButton}
							onClick={() => editor.chain().focus().undo().run()}
							disabled={!editor.can().undo()}
						>
							<Undo fontSize="small" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Redo">
						<IconButton
							className={classes.toolbarButton}
							onClick={() => editor.chain().focus().redo().run()}
							disabled={!editor.can().redo()}
						>
							<Redo fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			<Box className={classes.editorContent}>
				<EditorContent editor={editor} />
			</Box>
		</Box>
	);
};
