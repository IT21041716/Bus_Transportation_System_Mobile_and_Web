import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import SmartCardDashboard from './it21042560/SmartCardDashboard';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Sajindu */ }
          <Route path='/smartcard' element={<SmartCardDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
