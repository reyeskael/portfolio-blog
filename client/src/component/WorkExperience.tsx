import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import axios from 'axios';
import { colorPalette } from '../utils/cosmeticsHelper';
import { S3_BASE_URL, API_BASE_URL } from '../constant';

const useStyles = makeStyles({
    container: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column'
    },
	sectionTitle: {
		color: colorPalette.PRIMARY,
		textAlign: 'center',
		marginBottom: '32px'
	},
	experienceCard: {
		marginBottom: '24px'
	},
	companyHeader: {
		display: 'flex',
		alignItems: 'center',
		gap: '16px',
		marginBottom: '16px'
	},
	companyLogo: {
		width: '48px',
		height: '48px',
		objectFit: 'contain',
		borderRadius: '8px'
	},
	companyInfo: {
		display: 'flex',
		flexDirection: 'column'
	},
	experienceHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
		marginBottom: '8px'
	},
	jobTitle: {
		color: colorPalette.PRIMARY,
		fontWeight: 600
	},
	company: {
		color: colorPalette.PRIMARY,
		fontWeight: 500
	},
	duration: {
		color: colorPalette.INFO,
		fontSize: '14px'
	},
	experienceDescription: {
		color: colorPalette.INFO,
		lineHeight: 1.8,
		marginTop: '12px'
	},
	roleSection: {
		marginTop: '24px',
		paddingTop: '24px',
		borderTop: `1px solid ${colorPalette.INFO}20`
	}
});

interface Role {
	jobTitle: string;
	duration: string;
	description: string;
}

interface WorkExperienceItem {
	company: string;
	logo: string;
	totalDuration: string;
	roles: Role[];
}

export const WorkExperience = () => {
	const classes = useStyles();
	const [workExperienceData, setWorkExperienceData] = useState<WorkExperienceItem[]>([]);
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		axios.get(`${API_BASE_URL}/api/work-experience`)
			.then(response => {
				setWorkExperienceData(response.data.workExperience);
				setTitle(response.data.title);
			})
			.catch(error => console.error('Error fetching work experience:', error));
	}, []);

	return (
		<Box className={classes.container} id="work">
			<Typography variant="h4" className={classes.sectionTitle}>
				{title}
			</Typography>
			{workExperienceData.map((experience, index) => (
				<Card key={index} className={classes.experienceCard} elevation={2}>
					<CardContent>
						<Box className={classes.companyHeader}>
							<img
								src={`${S3_BASE_URL}/${experience.logo}`}
								alt={`${experience.company} logo`}
								className={classes.companyLogo}
							/>
							<Box className={classes.companyInfo}>
								<Typography variant="h6" className={classes.company}>
									{experience.company}
								</Typography>
								<Typography className={classes.duration}>
									{experience.totalDuration}
								</Typography>
							</Box>
						</Box>
						{experience.roles.map((role, roleIndex) => (
							<Box key={roleIndex} className={classNames({ [classes.roleSection]: roleIndex > 0 })}>
								<Box className={classes.experienceHeader}>
									<Typography variant="subtitle1" className={classes.jobTitle}>
										{role.jobTitle}
									</Typography>
									<Typography className={classes.duration}>
										{role.duration}
									</Typography>
								</Box>
								<Typography variant="body2" className={classes.experienceDescription}>
									{role.description}
								</Typography>
							</Box>
						))}
					</CardContent>
				</Card>
			))}
		</Box>
	);
};
