import express, {Application, Request, Response } from 'express';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';

const app: Application = express();

//middleware
app.use(express.json()); // middleware for parsing JSON bodies.

//Routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to App!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})