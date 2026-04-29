import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../../types";
import EntryDetails from "../EntryDetails";

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

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/patients/${id}`)
        .then((res) => setPatient(res.data));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newEntry;

    switch (type) {
      case "HealthCheck":
        newEntry = {
          type,
          description,
          date,
          specialist,
          healthCheckRating,
        };
        break;

      case "Hospital":
        newEntry = {
          type,
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      case "OccupationalHealthcare":
        newEntry = {
          type,
          description,
          date,
          specialist,
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
        `http://localhost:3001/api/patients/${patient?.id}/entries`,
        newEntry,
      );

      setPatient((prev) =>
        prev ? { ...prev, entries: prev.entries.concat(res.data) } : prev,
      );

      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(0);

      setDischargeDate("");
      setDischargeCriteria("");

      setEmployerName("");
      setSickStart("");
      setSickEnd("");
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
        <div>
          description
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          specialist
          <input
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />
        </div>

        <div>
          health rating
          <input
            type="number"
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="HealthCheck"
              checked={type === "HealthCheck"}
              onChange={() => setType("HealthCheck")}
            />
            HealthCheck
          </label>

          <label>
            <input
              type="radio"
              value="Hospital"
              checked={type === "Hospital"}
              onChange={() => setType("Hospital")}
            />
            Hospital
          </label>

          <label>
            <input
              type="radio"
              value="OccupationalHealthcare"
              checked={type === "OccupationalHealthcare"}
              onChange={() => setType("OccupationalHealthcare")}
            />
            Occupational
          </label>

          {type === "Hospital" && (
            <>
              <div>
                discharge date
                <input
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
                  value={sickStart}
                  onChange={(e) => setSickStart(e.target.value)}
                />
              </div>
              <div>
                sick leave end
                <input
                  value={sickEnd}
                  onChange={(e) => setSickEnd(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <button type="submit">add</button>
      </form>

      <h3>Entries</h3>

      {patient.entries.length === 0 && <p>No entries yet</p>}

      {patient.entries.map((entry) => (
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
      ))}
    </div>
  );
};

export default PatientDetailPage;
