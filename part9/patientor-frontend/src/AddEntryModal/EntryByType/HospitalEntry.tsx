import React from 'react';
import { Field } from 'formik';
import { TextField } from '../FormField';

const HospitalEntry: React.FC<{}> = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Field
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
      <Field
        label="Discharge criteria"
        placeholder="Criteria"
        name="discharge.criteria"
        component={TextField}
      />
    </div>
  );
};

export default HospitalEntry;
