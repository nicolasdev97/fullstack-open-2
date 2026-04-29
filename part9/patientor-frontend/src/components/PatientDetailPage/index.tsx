import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Diagnosis, Patient } from "../../types";
import EntryDetails from "../EntryDetails";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [error, setError] = useState("");

  const [type, setType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // Occupational
  const [employerName, setEmployerName] = useState("");
  const [sickStart, setSickStart] = useState("");
  const [sickEnd, setSickEnd] = useState("");

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/patients/${id}`)
        .then((res) => setPatient(res.data));
    }
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/diagnoses")
      .then((res) => setDiagnoses(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient?.id) {
      setError("Patient not found");
      return;
    }

    let newEntry;

    const baseEntry = {
      type,
      description,
      date,
      specialist,
      diagnosisCodes: selectedCodes.length ? selectedCodes : undefined,
    };

    switch (type) {
      case "HealthCheck":
        newEntry = {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;

      case "Hospital":
        newEntry = {
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        newEntry = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickStart && sickEnd
              ? {
                  startDate: sickStart,
                  endDate: sickEnd,
                }
              : undefined,
        };
        break;

      default:
        throw new Error("Unhandled entry type");
    }

    try {
      const res = await axios.post(
        `http://localhost:3001/api/patients/${patient.id}/entries`,
        newEntry,
      );

      setPatient((prev) =>
        prev
          ? {
              ...prev,
              entries: prev.entries.concat(res.data),
            }
          : prev,
      );

      // 🔥 RESET LIMPIO
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(0);

      setDischargeDate("");
      setDischargeCriteria("");

      setEmployerName("");
      setSickStart("");
      setSickEnd("");

      setSelectedCodes([]); // 🔥 IMPORTANTE

      setError(""); // limpia error si todo salió bien
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.error || "Error adding entry");
      } else {
        setError("Unknown error");
      }
    }
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>gender: {patient.gender}</p>

      <h3>Add new entry</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* DESCRIPTION */}
        <div>
          description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* DATE */}
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* SPECIALIST */}
        <div>
          specialist
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>

        {/* DIAGNOSIS SELECT */}
        <FormControl fullWidth style={{ marginTop: "10px" }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedCodes}
            onChange={(e) => {
              setSelectedCodes(e.target.value as string[]);
              setOpen(false); // 🔥 esto lo cierra al seleccionar
            }}
            input={<OutlinedInput label="Diagnosis Codes" />}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ENTRY TYPE */}
        <div style={{ marginTop: "10px" }}>
          <strong>Type:</strong>

          <label>
            <input
              type="radio"
              checked={type === "HealthCheck"}
              onChange={() => setType("HealthCheck")}
            />
            HealthCheck
          </label>

          <label>
            <input
              type="radio"
              checked={type === "Hospital"}
              onChange={() => setType("Hospital")}
            />
            Hospital
          </label>

          <label>
            <input
              type="radio"
              checked={type === "OccupationalHealthcare"}
              onChange={() => setType("OccupationalHealthcare")}
            />
            Occupational
          </label>
        </div>

        {/* HEALTHCHECK */}
        {type === "HealthCheck" && (
          <div>
            Health rating:
            {[0, 1, 2, 3].map((val) => (
              <label key={val} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  checked={healthCheckRating === val}
                  onChange={() => setHealthCheckRating(val)}
                />
                {val}
              </label>
            ))}
          </div>
        )}

        {/* HOSPITAL */}
        {type === "Hospital" && (
          <>
            <div>
              discharge date
              <input
                type="date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
              />
            </div>

            <div>
              criteria
              <input
                value={dischargeCriteria}
                onChange={(e) => setDischargeCriteria(e.target.value)}
              />
            </div>
          </>
        )}

        {/* OCCUPATIONAL */}
        {type === "OccupationalHealthcare" && (
          <>
            <div>
              employer name
              <input
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </div>

            <div>
              sick leave start
              <input
                type="date"
                value={sickStart}
                onChange={(e) => setSickStart(e.target.value)}
              />
            </div>

            <div>
              sick leave end
              <input
                type="date"
                value={sickEnd}
                onChange={(e) => setSickEnd(e.target.value)}
              />
            </div>
          </>
        )}

        <button type="submit">add</button>
      </form>

      <h3>Entries</h3>

      {!patient.entries || patient.entries.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        patient.entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <EntryDetails entry={entry} />
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDetailPage;
