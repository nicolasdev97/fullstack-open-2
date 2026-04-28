import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;
