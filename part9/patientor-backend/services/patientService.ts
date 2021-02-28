import patients from '../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry, Patient, NewEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Entry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
};

const getPatientById = (id: string): Patient => {
  const patient = patients.filter(patient => patient.id === id)[0];
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    ssn: patient.ssn,
    entries: patient.entries
  };
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: Math.random().toString(36).substring(10),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (
  entry: NewEntry,
  id: string
): Entry => {
  const patient = patients.find((patient: Patient) => patient.id === id);

  switch (entry.type) {
    case 'HealthCheck':
      const healthCheckEntry = {
        id: Math.random().toString(36).substring(10),
        ...(entry as NewHealthCheckEntry),
      };
      patient?.entries.push(healthCheckEntry);
      return healthCheckEntry;
    case 'Hospital':
      const hospitalEntry = {
        id: Math.random().toString(36).substring(10),
        ...(entry as NewHospitalEntry),
      };
      patient?.entries.push(hospitalEntry);
      return hospitalEntry;
    case 'OccupationalHealthcare':
      const occEntry = {
        id: Math.random().toString(36).substring(10),
        ...(entry as NewOccupationalHealthcareEntry),
      };
      patient?.entries.push(occEntry);
      return occEntry;
    default:
      throw new Error("invalid");
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatientById,
  addPatient,
  addEntry
};
