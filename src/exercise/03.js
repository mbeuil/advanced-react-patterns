// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function ToggleProvider(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const value = {on, toggle}

  return <ToggleContext.Provider value={value} {...props} />
}

function useToggle() {
  const context = React.useContext(ToggleContext)

  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider')
  }
  return context
}

function ToggleOn({children}) {
  const {on} = useToggle()

  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()

  return on ? null : children
}

function ToggleButton(props) {
  const {on, toggle} = useToggle()

  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <>
      <ToggleProvider>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </ToggleProvider>
    </>
  )
}

export default App
