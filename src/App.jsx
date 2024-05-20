import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PerDay from './Components/PerDay';
import Live from './Components/Live';
import Home from './Components/Home';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PerDay />
      <Live/>
      
    </LocalizationProvider>
  );
}

export default App;
