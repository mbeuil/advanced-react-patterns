// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {Switch} from '../switch'

/**
 * callAll take any number of functions
 * return a function that take any numbers of arguments
 * then call every functions with all the args
 */

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  function getTogglerProps({onClick, ...otherProps}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...otherProps,
    }
  }

  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
