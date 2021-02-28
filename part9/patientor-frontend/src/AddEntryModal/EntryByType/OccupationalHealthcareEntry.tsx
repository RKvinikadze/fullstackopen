import React from 'react';
import { Field } from 'formik';
import { TextField } from '../FormField';

const OccupationalHealthcareEntry: React.FC<{}> = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Field
        label="Employer Name"
        placeholder="Employer Name"
        name="employerName"
        component={TextField}
      />
      <Field
        label="SickLeave Start Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="SickLeave End Date"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </div>
  );
};

export default OccupationalHealthcareEntry;
