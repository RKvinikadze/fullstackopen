import React from 'react';
import { HospitalEntry } from '../../types';

import {Card, Icon} from 'semantic-ui-react';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital outline" size="big" />
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

export default Hospital;
