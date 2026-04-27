"use strict";
const calculateBmi = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi < 25) {
        return "Normal (healthy weight)";
    }
    else if (bmi < 30) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
console.log(calculateBmi(180, 74));
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    if (args.length > 4)
        throw new Error("Too many arguments");
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) {
        throw new Error("Provided values were not numbers!");
    }
    return [height, weight];
};
try {
    const [height, weight] = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error:", error.message);
    }
}
