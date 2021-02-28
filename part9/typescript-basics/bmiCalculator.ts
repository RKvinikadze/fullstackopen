interface bmiValues {
  height: number
  weight: number
}

export const parseArgs = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (h: number, w: number): string => {
  const bmi = w / ((h / 100) * (h / 100));
  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight';
  } else if (bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    return 'Obese Class II (Severely obese)	';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

/*try {
  const { height, weight } = parseArgs(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error) {
  console.log('Something went wrong, message: ', error.message)
}*/