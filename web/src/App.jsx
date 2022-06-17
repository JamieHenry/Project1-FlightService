import { FlightList } from './components/FlightList/FlightList';


function App() {
  return (
    <>
      <div style={{backgroundColor: 'green', padding: '1em 1.5em', textAlign: 'center'}}>
          Nav Bar
      </div>
      <div style={{backgroundColor: 'blue', padding: '1em 1.5em', textAlign: 'center'}}>
          Form Container
      </div>
      <div style={{backgroundColor: 'red', padding: '1em 1.5em', textAlign: 'center', marginBottom: '15px'}}>
          Filter Container
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '75% 25%', gap: '10px'}}>
        <div><FlightList /></div>
        <div style={{backgroundColor: 'yellow', padding: '1em 1.5em', textAlign: 'center'}}>Update Form Container</div>
      </div>
    </>
  );
}

export default App;