import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddFlights from './Pages/AddFlights';
import FlightList from './Pages/FlightList';
import BookFlight from './Pages/BookFlight';
import Header from './widgets/Header';
import Home from './Pages/Home';
import LoginForm from './Pages/Login';
import Register from './Pages/Register';
import ViewBookings from './Pages/ViewBookings';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/flights/:source/:destination/:date" element={<FlightList />} />
          <Route path='/flights/book/:id' element={<BookFlight />} />
          <Route path='/bookings' element={<ViewBookings />} />
          <Route path='/addflight' element={<AddFlights />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App