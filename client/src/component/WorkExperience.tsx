import { Box, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { colorPalette } from '../utils/cosmeticsHelper';

import { S3_BASE_URL } from '../constant';

const PenbrothersLogo = `${S3_BASE_URL}/company/small/Penbrothers.png`;
const MPHLogo = `${S3_BASE_URL}/company/small/MPH.png`;
const AccentureLogo = `${S3_BASE_URL}/company/small/Accenture.png`;
const SqreemLogo = `${S3_BASE_URL}/company/small/SQREEM.jpeg`;

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

const workExperienceData: WorkExperienceItem[] = [
	{
		company: 'Penbrothers',
		logo: PenbrothersLogo,
		totalDuration: '1 year 10 months',
		roles: [
			{
				jobTitle: 'Software Engineer',
				duration: 'Apr 2024 - Present',
				description: 'Spearheading front-end development initiatives using React.js and TypeScript, building responsive and performant user interfaces. Responsible for seamless API integration using Axios and managing complex application state with Redux. Ensuring code quality and reliability through comprehensive unit testing with Jest, while collaborating with cross-functional teams to deliver scalable web solutions.'
			}
		]
	},
	{
		company: 'Metro Pacific Health',
		logo: MPHLogo,
		totalDuration: '1 year 5 months',
		roles: [
			{
				jobTitle: 'Specialist - Developer Analyst',
				duration: 'Dec 2022 - Apr 2024',
				description: 'Led full-stack development efforts, architecting and implementing both front-end and back-end solutions using Node.js, React.js, and Express.js. Designed and maintained MongoDB databases with Mongoose ODM for efficient data management. Leveraged MuleSoft Anypoint Studio for low-code API integrations and deployed cloud infrastructure on AWS S3. Facilitated daily developer stand-ups and coordinated weekly vendor meetings to ensure smooth project delivery and team alignment.'
			}
		]
	},
	{
		company: 'Accenture',
		logo: AccentureLogo,
		totalDuration: '1 year 5 months',
		roles: [
			{
				jobTitle: 'Application Development Analyst',
				duration: 'Jul 2021 - Nov 2022',
				description: 'Delivered enterprise-grade applications through full-stack development using Node.js, React.js, and GraphQL APIs. Built and maintained serverless architectures on AWS utilizing Lambda functions, Step Functions for workflow orchestration, and CloudWatch for monitoring and logging. Practiced Agile methodology with TypeScript across the codebase, ensuring type safety and maintainability. Wrote comprehensive test suites using Jest to guarantee application reliability.'
			}
		]
	},
	{
		company: 'Sqreem Technologies',
		logo: SqreemLogo,
		totalDuration: '3 years 1 month',
		roles: [
			{
				jobTitle: 'Software Engineer',
				duration: 'Jun 2019 - Jun 2021',
				description: 'Developed dynamic front-end applications with advanced DOM manipulation and responsive designs using JavaScript and CSS. Integrated RESTful APIs and managed cloud resources on AWS including S3 for storage, API Gateway for endpoint management, SQS for message queuing, and CloudWatch for system monitoring. Created wireframes and prototypes to translate business requirements into intuitive user experiences, collaborating closely with stakeholders throughout the design process.'
			},
			{
				jobTitle: 'Test Engineer',
				duration: 'Jun 2018 - May 2019',
				description: 'Designed comprehensive test plans and executed various testing methodologies including cycle testing, stress testing, and manual testing to ensure software quality. Developed internal testing tools and automation scripts using JavaScript and C#.Net, significantly improving the testing team\'s efficiency. Collaborated with developers to identify and resolve defects early in the development lifecycle, contributing to higher product quality and faster release cycles.'
			}
		]
	}
];

export const WorkExperience = () => {
	const classes = useStyles();

	return (
		<Box className={classes.container} id="work">
			<Typography variant="h4" className={classes.sectionTitle}>
				Work Experience
			</Typography>
			{workExperienceData.map((experience, index) => (
				<Card key={index} className={classes.experienceCard} elevation={2}>
					<CardContent>
						<Box className={classes.companyHeader}>
							<img
								src={experience.logo}
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
