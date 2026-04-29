import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Diagnosis, Patient } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetailPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/patients/${id}`)
        .then((res) => setPatient(res.data));
    }
  }, [id]);

  const getDiagnosisName = (code: string): string => {
    const diagnose = diagnoses.find((d) => d.code === code);
    return diagnose ? diagnose.name : "Unknown diagnosis";
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>gender: {patient.gender}</p>

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
          <p>
            <strong>{entry.date}</strong>
          </p>

          <p>{entry.description}</p>

          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{getDiagnosisName(code)}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientDetailPage;
