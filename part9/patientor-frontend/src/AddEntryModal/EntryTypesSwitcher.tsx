/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import HospitalEntry from './EntryByType/HospitalEntry';
import HealthCheckEntry from './EntryByType/HealthCheckEntry';
import OccupationalHealthcareEntry from './EntryByType/OccupationalHealthcareEntry';

const assertNever = (value: any): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryTypesSwitcher: React.FC<{ type: any }> = ({ type }) => {
  switch (type) {
    case 'Hospital':
      return <HospitalEntry />;
    case 'HealthCheck':
      return <HealthCheckEntry />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry />;
    default:
      return assertNever(type);
  }
};

export default EntryTypesSwitcher;
