import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightCard from '../widgets/FlightCard';

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const handleFetchFlights = async () => {
    try {
      const response = await fetch('https://bookmyflights-server.onrender.com/flights/getFlights', {
        method: 'GET',
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        setFlights(jsonResponse);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      alert('An error occurred fetching flights');
    }
  }

  const handleNavigate = async (id) => {
    const response = await fetch('https://bookmyflights-server.onrender.com/auth/checkLogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    if (response.ok) {
      navigate(`/flights/book/${id}`);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    handleFetchFlights();
  }, []);

  return (
    <div className="Home container" style={{
      marginTop: '200px',
    }}>
      <div className="row">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder='Departure City' value={departure} onChange={e => setDeparture(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder='Arrival City' value={arrival} onChange={e => setArrival(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" placeholder='Departure Date' value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="col-md-3">

          <button className="btn btn-primary" onClick={() => navigate(`/flights/${departure}/${arrival}/${date}`)}>Search</button>
        </div>
      </div>
      <h3 className="mt-5">Cheapest flights of the week</h3>
      <div className="row mt-5">
        {
          flights
            .filter(flight => {
              const flightDate = new Date(flight.departureTime);
              const now = new Date();
              const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
              return flightDate > now && flightDate >= startOfWeek;
            })
            .sort((a, b) => Math.min(...a.prices) - Math.min(...b.prices))
            .slice(0, 6)
            .map((Flight) => (
              <FlightCard flight={Flight} />
            ))
        }
      </div>
    </div>
  );
}