/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  if (
    req.query.height &&
    req.query.weight &&
    !isNaN(Number(req.query.height)) &&
    !isNaN(Number(req.query.weight))
  ) {
    const { height, weight } = req.query;

    res.json({
      weight: weight,
      height: height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.json({
      error: 'mailformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    if(body.daily_exercises && body.target){
        const result = calculateExercises(body.daily_exercises, body.target);
        return res.status(201).json(result);
    }
    return res.status(400).json({
      error: 'mailformatted parameters',
    });
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});