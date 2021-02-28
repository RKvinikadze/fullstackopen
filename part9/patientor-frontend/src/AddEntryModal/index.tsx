/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';

import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: string | undefined;
  typeSwitcher: (value: any) => void;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  entryType,
  typeSwitcher,
}: Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      {/*  */}
      {!entryType ? (
        <>
          <Modal.Header>Choose Entry Type</Modal.Header>
          <Modal.Content>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Button onClick={() => typeSwitcher('Hospital')}>
                HospitalEntry
              </Button>
              <Button onClick={() => typeSwitcher('HealthCheck')}>
                HealthCheckEntry
              </Button>
              <Button onClick={() => typeSwitcher('OccupationalHealthcare')}>
                OccupationalHealthcareEntry
              </Button>
            </div>
          </Modal.Content>
        </>
      ) : (
        <>
          <Modal.Header>
            <h2>Add a New {entryType} Entry</h2>
            <Button onClick={() => typeSwitcher('')}>
              Select Another Entry Type
            </Button>
          </Modal.Header>
          <Modal.Content>
            {error && (
              <Segment inverted color="red">{`Error: ${error}`}</Segment>
            )}
            {
              <AddEntryForm
                onSubmit={onSubmit}
                onCancel={onClose}
                entryType={entryType}
              />
            }
          </Modal.Content>
        </>
      )}
    </Modal>
  );
};

export default AddEntryModal;
