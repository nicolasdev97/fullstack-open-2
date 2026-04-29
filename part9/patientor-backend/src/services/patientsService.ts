import patientsData from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry,
} from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData.map((p) => ({
  ...p,
  entries: [...p.entries],
}));

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ ssn, entries, ...rest }) => rest);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries = patient.entries.concat(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
