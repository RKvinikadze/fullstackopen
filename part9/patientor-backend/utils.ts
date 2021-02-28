/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientEntry,
  HealthCheckRating,
  Gender,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
  NewHospitalEntry,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: any): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isType = (param: any): boolean => {
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (rating === 0){
    return rating;
  }
  if (!rating || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing croteria: ' + criteria);
  }
  return criteria;
};

const parseType = (type: any): string => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseSickLeave = (
  sickLeave: any
): { startDate: string; endDate: string } | undefined => {
  if (
    sickLeave &&
    (sickLeave.startDate !== '' && sickLeave.endDate !== '') &&
    (!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate))
  ) {
    throw new Error('sickLeave fields are incorrect or missing');
  }

  return sickLeave;
};

const parseDiagnoseCodes = (codes: any): string[] | undefined => {
  if (codes) {
    codes.forEach((element: any) => {
      if (!isString(element)) {
        throw new Error('diagnose codes includes non string object');
      }
    });
  }

  return codes;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
};

export const toNewEntry = (
  object: any
): NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry => {
  console.log(object);
  const EntryType = parseType(object.type);

  if (EntryType === 'HealthCheck') {
    return {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: EntryType,
      healthCheckRating: parseRating(object.healthCheckRating),
      diagnosisCodes: parseDiagnoseCodes(object.diagnosisCodes) || undefined,
    };
  } else if (EntryType === 'OccupationalHealthcare') {
    return {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: EntryType,
      employerName: parseName(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave) || undefined,
      diagnosisCodes: parseDiagnoseCodes(object.diagnosisCodes) || undefined,
    };
  } else if (EntryType === 'Hospital') {
    return {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnoseCodes(object.diagnosisCodes) || undefined,
      type: EntryType,
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseCriteria(object.discharge.criteria),
      },
    };
  } else {
    throw new Error('ERROR');
  }
};
