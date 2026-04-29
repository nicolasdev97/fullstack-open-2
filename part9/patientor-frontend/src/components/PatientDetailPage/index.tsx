import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Patient } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/patients/${id}`)
        .then((res) => setPatient(res.data));
    }
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>date of birth: {patient.dateOfBirth}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>gender: {patient.gender}</p>
      <h3>Entries</h3>
      {(!patient.entries || patient.entries.length === 0) && (
        <p>No entries yet</p>
      )}
    </div>
  );
};

export default PatientDetailPage;
