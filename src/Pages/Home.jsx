import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="row mt-5">
        {
          flights.sort((a, b) => Math.min(...a.prices) - Math.min(...b.prices))
            .slice(0, 6)
            .map((flight) => (
              <div key={flight.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{flight.source}</h5>
                    <p className="card-text">{flight.destination}</p>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}