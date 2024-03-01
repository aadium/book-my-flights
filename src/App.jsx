import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddFlights from './Pages/AddFlights';
import FlightList from './Pages/FlightList';
import Header from './widgets/Header';
import Home from './Pages/Home';
import LoginForm from './Pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/flights/:source/:destination/:date" element={<FlightList />} />
          <Route path='/addflight' element={<AddFlights />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App