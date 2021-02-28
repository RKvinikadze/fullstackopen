import React from 'react';

const Course = props => {
  return (
    <div className="container">
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <ul>
      {props.parts.map(x => (
        <li key={x.id}>
          <Part part={x} />
        </li>
      ))}
    </ul>
  );
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = props => {
  const total = props.parts.reduce((sum, part) => {
    return (sum = sum + part.exercises);
  }, 0);

  return <p className="total">Number of exercises {total}</p>;
};

export default Course;
