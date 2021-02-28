/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../types';

export type EntryFormValues = Omit<
  HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry,
  'id'
>;

export type EntryValues = Omit<Entry, 'id'>;

export const getInitialValues = (entryType: any) => {
  switch (entryType) {
    case 'Hospital':
      return {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: entryType,
        discharge: {
          date: '',
          criteria: '',
        },
      };
    case 'HealthCheck':
      return {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: entryType,
        healthCheckRating: 0,
      };
    case 'OccupationalHealthcare':
      return {
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: entryType,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      };
    default:
      throw new Error('ERROR');
  }
};
