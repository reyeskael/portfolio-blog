import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import techStack from './data/techStack.json';
import workExperience from './data/workExperience.json';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/api/tech-stack', (req: Request, res: Response) => {
    res.json(techStack);
});

app.get('/api/work-experience', (req: Request, res: Response) => {
    res.json(workExperience);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
