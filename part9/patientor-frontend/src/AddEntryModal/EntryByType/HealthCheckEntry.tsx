import React from 'react';
import { Field } from 'formik';
import { NumberField } from '../FormField';

const HealthCheckEntry: React.FC<{}> = () => {
  return (
    <Field
      label="Health check rating"
      name="healthCheckRating"
      component={NumberField}
      min={0}
      max={3}
    />
  );
};

export default HealthCheckEntry;
