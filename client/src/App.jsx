import React from 'react';
import { Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import TicketPage from './components/TicketPage'
import AdminPage from './components/AdminPage'

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/create-ticket" element={<TicketPage/>}/>
        <Route exact path="/admin-panel" element={<AdminPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
