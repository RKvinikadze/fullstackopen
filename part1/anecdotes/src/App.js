import React, { useState } from 'react';

const BestAnecdote = props => {
  const { anecdotes, votes } = props;
  var max = 0;
  for (var i = 0; i < votes.length; i++) {
    if (votes[i] > votes[max]) {
      max = i;
    }
  }

  return votes[max] ? (
    <div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[max]}
      <br />
      with votes {votes[max]}
    </div>
  ) : (
    <h3>No votes yet</h3>
  );
};

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(
    Array.apply(null, new Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const NextAnectdote = () => {
    var anecdote = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(anecdote);
  };

  const Vote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      {points[selected]}
      <div>
        <button onClick={() => Vote()}>vote</button>
        <button onClick={() => NextAnectdote()}>next anecdote</button>
      </div>
      <BestAnecdote anecdotes={props.anecdotes} votes={points} />
    </div>
  );
};

export default App;
