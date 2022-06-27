import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppNavBar } from './features';
import { Landing, Flights, Error } from './pages';

function App() {
  return (
    <BrowserRouter>
      <AppNavBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/flights' element={<Flights />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;