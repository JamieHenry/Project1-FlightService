import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlightList } from './components/FlightList/FlightList';
import { AppNewFlightForm } from './features';

function App() {
  
  const [currFlights, setCurrFlights] = useState([]);

  const updateFlights = () => {
    axios.get('http://localhost:8080/flights')
      .then(res => setCurrFlights(res.data));
  }

  useEffect(() => {
    updateFlights();
  }, []);

  return (
    <>
      <div style={{backgroundColor: 'green', padding: '1em 1.5em', textAlign: 'center'}}>
          Nav Bar
      </div>
      <div style={{backgroundColor: 'lightgray', padding: '1em 1.5em', textAlign: 'center'}}>
          <AppNewFlightForm updateFlights={updateFlights}/>
      </div>
      <div style={{backgroundColor: 'red', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
          Filter Container
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '40% 60%', gap: '10px'}}>
        <div><FlightList flights={currFlights} updateFlights={updateFlights} /></div>
        <div style={{backgroundColor: 'yellow', padding: '1em 1.5em', textAlign: 'center'}}>Update Form Container</div>
      </div>
    </>
  );
}

export default App;