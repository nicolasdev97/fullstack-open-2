import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
