import {
  NewPatient,
  Gender,
  Diagnosis,
  NewEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isHealthCheckRating = (value: number): boolean => {
  return Object.values(HealthCheckRating).includes(value);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseHealthCheckRating = (value: unknown): number => {
  if (typeof value !== "number" || !isHealthCheckRating(value)) {
    throw new Error(`Invalid healthCheckRating: ${value}`);
  }

  return value;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseStringField = (object: unknown, fieldName: string): string => {
  if (!object || typeof object !== "object" || !(fieldName in object)) {
    throw new Error(`Missing field: ${fieldName}`);
  }

  const value = object[fieldName as keyof object];

  if (!isString(value)) {
    throw new Error(`Incorrect type for field: ${fieldName}`);
  }

  return value;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const obj = object as {
    name: unknown;
    dateOfBirth: unknown;
    ssn: unknown;
    gender: unknown;
    occupation: unknown;
  };

  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: [],
  };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid data");
  }

  if (!("type" in object)) {
    throw new Error("Missing type");
  }

  const baseEntry = {
    description: parseStringField(object, "description"),
    date: parseStringField(object, "date"),
    specialist: parseStringField(object, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch (object.type) {
    case "Hospital":
      if (!("discharge" in object) || !isObject(object.discharge)) {
        throw new Error("Invalid or missing discharge");
      }

      const discharge = object.discharge;

      return {
        type: "Hospital",
        description: parseStringField(object, "description"),
        date: parseStringField(object, "date"),
        specialist: parseStringField(object, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
        discharge: {
          date: parseStringField(discharge, "date"),
          criteria: parseStringField(discharge, "criteria"),
        },
      };

    case "OccupationalHealthcare":
      if (!("employerName" in object)) {
        throw new Error("Missing employerName");
      }

      const sickLeave =
        "sickLeave" in object && isObject(object.sickLeave)
          ? {
              startDate: parseStringField(object.sickLeave, "startDate"),
              endDate: parseStringField(object.sickLeave, "endDate"),
            }
          : undefined;

      return {
        type: "OccupationalHealthcare",
        description: parseStringField(object, "description"),
        date: parseStringField(object, "date"),
        specialist: parseStringField(object, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
        employerName: parseStringField(object, "employerName"),
        sickLeave,
      };

    case "HealthCheck":
      if (!("healthCheckRating" in object)) {
        throw new Error("Missing healthCheckRating");
      }

      const rating = object.healthCheckRating;

      return {
        type: "HealthCheck",
        description: parseStringField(object, "description"),
        date: parseStringField(object, "date"),
        specialist: parseStringField(object, "specialist"),
        diagnosisCodes: parseDiagnosisCodes(object),
        healthCheckRating: parseHealthCheckRating(rating),
      };

    default:
      throw new Error("Invalid entry type");
  }
};
