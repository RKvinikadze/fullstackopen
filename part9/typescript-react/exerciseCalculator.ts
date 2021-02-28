interface inputValues {
  days: number[]
  target: number
}

export const parseArguments = (args: string[]): inputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const arr: number[] = [];
  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i > 2) {
        arr.push(Number(args[i]));
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  return{
    days: arr,
    target: Number(args[2])
  };
};

interface result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (days: number[], target: number): result => {
  const average = days.reduce((a, b) => a + b, 0) / days.length;
  const rating = () => {
    if (average >= target) {
      return {
        value: 3,
        decription: 'excellent job!',
      };
    } else if (target - average <= 0.7) {
      return {
        value: 2,
        decription: 'not too bad but could be better',
      };
    } else {
      return {
        value: 1,
        decription: 'you have to work more hard',
      };
    }
  };

  return {
    periodLength: days.length,
    trainingDays: days.filter(d => d !== 0).length,
    success: average >= target ? true : false,
    rating: rating().value,
    ratingDescription: rating().decription,
    target: target,
    average: average,
  };
};

/*
try {
  const { days, target } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something went wrong, message: ', e.message);
}*/