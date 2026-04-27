import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  // If height or weight is missing, return an error response
  if (!height || !weight) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // Convert height and weight to numbers
  const heightNum = Number(height);
  const weightNum = Number(weight);

  // If height or weight is not a valid number, return an error response
  if (isNaN(heightNum) || isNaN(weightNum)) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // Calculate BMI using the calculateBmi function
  const bmi = calculateBmi(heightNum, weightNum);

  // Return the response with weight, height, and BMI
  return res.json({
    weight: weightNum,
    height: heightNum,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  const { daily_exercises, target } = body;

  // If parameters are missing, return an error response
  if (!daily_exercises || target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  // If parameters are not in the correct format, return an error response
  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((d: unknown) => isNaN(Number(d)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // If parameters are not valid numbers, return an error response
  if (daily_exercises.some((d) => isNaN(Number(d))) || isNaN(Number(target))) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  // Convert to numbers
  const dailyHours = daily_exercises.map((d: number) => Number(d));
  const targetNum = Number(target);

  // Calculate the exercise results using the calculateExercises function
  const result = calculateExercises(dailyHours, targetNum);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
