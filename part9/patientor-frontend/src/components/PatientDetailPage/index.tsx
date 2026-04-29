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

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/patients/${id}`)
        .then((res) => setPatient(res.data));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
    };

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
      setError("");
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
          {patient.entries.map((entry) => (
            <div key={entry.id}>
              <EntryDetails entry={entry} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatientDetailPage;
