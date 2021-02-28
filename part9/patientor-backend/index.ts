import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(express.static('build'));

app.get('/api/ping', (_req, res) => {
    res.send("hello world");
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});