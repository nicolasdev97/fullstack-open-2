import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent entry={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalEntryComponent entry={entry} />;

    case "HealthCheck":
      return <HealthCheckEntryComponent entry={entry} />;

    default:
      return assertNever(entry);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> 🏥
      </p>
      <p>{entry.description}</p>
      <p>
        Discharge: {entry.discharge.date} ({entry.discharge.criteria})
      </p>
    </div>
  );
};

const OccupationalEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> 💼 {entry.employerName}
      </p>
      <p>{entry.description}</p>

      {entry.sickLeave && (
        <p>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </p>
      )}
    </div>
  );
};

const HealthCheckEntryComponent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <p>
        <strong>{entry.date}</strong> ❤️
      </p>
      <p>{entry.description}</p>
      <p>Health rating: {entry.healthCheckRating}</p>
    </div>
  );
};

export default EntryDetails;
