import express, { Request, Response } from 'express';
import { tasks } from './data/tasks';

const app = express();
app.use(express.json());

const port = 3000;

app.get('/api', (_, res: Response) => {
    res.send('Hello World!');
});

app.get('/api/tasks/', (_: Request, res: Response) => {
    const allTasks = tasks;

    res.status(200).json(allTasks);
});

app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const singleTask = tasks.find((task) => task.id.toString() === id);

    res.status(200).json(singleTask);
});

app.post('/api/tasks/', (req: Request, res: Response) => {
    const body = req.body;
    tasks.push(body);

    res.status(200).json(tasks);
});

app.put('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { todo } = req.body;

    tasks.map((task) => { if (task.id.toString() === id) { task.todo = todo } })

    res.status(200).json(tasks);
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    tasks.splice(Number(id) - 1);

    res.status(200).json(tasks);
});

app.listen(port, () => {
    console.log(`Server Running Up on port ${port}`);
});
