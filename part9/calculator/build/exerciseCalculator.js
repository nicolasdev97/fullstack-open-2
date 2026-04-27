"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateExercises = void 0;
const calculateExercises = (dailyHours, target) => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((day) => day > 0).length;
    const totalHours = dailyHours.reduce((sum, day) => sum + day, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = "great job, target achieved";
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }
    else {
        rating = 1;
        ratingDescription = "you need to work harder";
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};
exports.calculateExercises = calculateExercises;
console.log((0, exports.calculateExercises)([3, 0, 2, 4.5, 0, 3, 1], 2));
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error("Not enough arguments");
    const target = Number(args[2]);
    const dailyHours = args.slice(3).map(Number);
    if (isNaN(target) || dailyHours.some(isNaN)) {
        throw new Error("Provided values were not numbers!");
    }
    return {
        target,
        dailyHours,
    };
};
try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log((0, exports.calculateExercises)(dailyHours, target));
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error:", error.message);
    }
}
