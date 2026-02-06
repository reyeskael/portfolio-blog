import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import techStack from './data/techStack.json';
import workExperience from './data/workExperience.json';
import profile from './data/profile.json';
import blogPosts from './data/blogPosts.json';
import footer from './data/footer.json';

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

app.get('/api/profile', (req: Request, res: Response) => {
    res.json(profile);
});

app.get('/api/blog-posts', (req: Request, res: Response) => {
    res.json(blogPosts);
});

app.get('/api/blog-page/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const filePath = path.join(__dirname, 'data', 'blogPages', `${id}.json`);
    
    if (fs.existsSync(filePath)) {
        const blogPage = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(blogPage);
    } else {
        res.status(404).json({ error: 'Blog page not found' });
    }
});

app.get('/api/footer', (req: Request, res: Response) => {
    res.json(footer);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
