import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  res.json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body); // 👈 validación real
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(req.params.id, newEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (error instanceof Error) {
      message = error.message;
    }

    res.status(400).json({ error: message });
  }
});

export default router;
