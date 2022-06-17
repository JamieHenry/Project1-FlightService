import { FlightCard } from './components/FlightCard/FlightCard';
import { FormComponent } from './components/FormComponent/FormComponent';

function App() {

  const flights = [];
  fetch('http://localhost:8080/flights')
    .then(data => {
        for (let elem in data) {
          flights.push(elem);
        }
    })
    .catch(err => console.log(err));

  console.log(flights);

  return (
    <div>
      <div for=''>
        <FlightCard />
      </div>
    </div>
  );
}

export default App;