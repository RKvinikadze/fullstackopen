import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';

import { Card, Icon } from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  console.log(entry);
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="treatment" size="big" /> {entry.employerName}
        </Card.Header>
        <Card.Description content={entry.description} />
      </Card.Content>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </Card>
  );
};

export default OccupationalHealthcare;
