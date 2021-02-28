import React from 'react';
import { HealthCheckEntry } from '../../types';

import { Card, Icon } from 'semantic-ui-react';

const HeartIcon: React.FC<{ rating: number }> = ({ rating }) => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="green" size="large" />;
    case 1:
      return <Icon name="heart" color="yellow" size="large" />;
    case 2:
      return <Icon name="heart" color="blue" size="large" />;
    case 3:
      return <Icon name="heart" color="red" size="large" />;
    default:
      return null;
  }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="doctor" size="big" />
        </Card.Header>
        <Card.Description content={entry.description} />
        <div style={{ marginTop: '8px' }}>
          <HeartIcon rating={entry.healthCheckRating} />
        </div>
        <ul>
          {entry.diagnosisCodes?.map((code: string) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default HealthCheck;
