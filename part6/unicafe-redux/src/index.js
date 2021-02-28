import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = store.getState().good + store.getState().ok + store.getState().bad
  const average = (store.getState().good - store.getState().bad)/all 
  const positive = store.getState().good / all

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={good}>good</button> 
      <button onClick={neutral}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      { 
      (store.getState().good || store.getState().ok || store.getState().bad)?
        <div>
          <div>good {store.getState().good}</div>
          <div>neutral {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
          <div>all {all}</div>
          <div>average {average}</div>
          <div>positive {(positive*100).toFixed(1)}%</div>
        </div>: 
        <h3>no feedback yet</h3>
      }
      
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
