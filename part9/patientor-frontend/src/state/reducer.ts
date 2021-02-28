import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'SHOW_PATIENT_INFO';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_ENTRY';
      payload: {
        entry: Entry;
        id: string;
      };
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const addEntry = (entry: Entry, id: string): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: {
      id: id,
      entry: entry,
    },
  };
};


export const setDiagnoses = (diagnosesFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnosesFromApi
  };
};

export const showPatientInfo = (patient: Patient): Action => {
  return {
    type: 'SHOW_PATIENT_INFO',
    payload: patient,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_ENTRY':
      state.patients[action.payload.id].entries.push(action.payload.entry);
      return state;
    case 'SHOW_PATIENT_INFO':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES':
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};
