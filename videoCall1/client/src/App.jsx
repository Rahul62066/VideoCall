import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LobbyScreen from './screens/LobbyScreen'
import Room from './screens/Room'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App