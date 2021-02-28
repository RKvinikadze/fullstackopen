/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import axios from 'axios';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { Button } from 'semantic-ui-react';

import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { useStateValue, showPatientInfo, addEntry } from '../state';
import { Patient, Entry } from '../types';
import EntryDetails from './EntryDetails';

const PatientInformationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] = React.useState<string | undefined>('');

  const openModal = (): void => setModalOpen(true);

  const typeSwitcher = (value: any): void => setEntryType(value);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setEntryType('');
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(showPatientInfo(patient));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  const patient: Patient | undefined = patients[id];

  if (patient === undefined) {
    return <div>LOADING...</div>;
  }

  return (
    <div>
      <h2>
        {patient.name}{' '}
        {patient.gender === 'male' ? (
          <i className="mars icon"></i>
        ) : (
          <i className="venus icon"></i>
        )}
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries
        ? patient.entries.map((entry: Entry) => {
            console.log("entry", entry);
            return <EntryDetails entry={entry} key={entry.id} />;
          })
        : null}
      <div>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          entryType={entryType}
          typeSwitcher={typeSwitcher}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    </div>
  );
};

export default PatientInformationPage;
