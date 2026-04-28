import patientsData from "../data/patients";
import { Patient, NonSensitivePatient } from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ ssn, ...rest }) => rest);
};

export default {
  getPatients,
  getNonSensitivePatients,
};
