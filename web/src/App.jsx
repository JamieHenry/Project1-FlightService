import { FlightList } from './components/FlightList/FlightList';
import { AppNewFlightForm } from './features';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [flights, setFlights] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/flights')
          .then(res => setFlights(res.data));
  }, []);

  return (
    <>
      <div style={{backgroundColor: 'green', padding: '1em 1.5em', textAlign: 'center'}}>
          Nav Bar
      </div>
      <div style={{backgroundColor: 'lightgray', padding: '1em 1.5em', textAlign: 'center'}}>
          <AppNewFlightForm />
      </div>
      <div style={{backgroundColor: 'red', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
          Filter Container
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '40% 60%', gap: '10px'}}>
        <div><FlightList flights={flights} /></div>
        <div style={{backgroundColor: 'yellow', padding: '1em 1.5em', textAlign: 'center'}}>Update Form Container</div>
      </div>
    </>
  );
}

export default App;