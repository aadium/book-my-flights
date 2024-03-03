import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../widgets/FlightCard';

function FlightList() {
  const navigate = useNavigate();
  var { source, destination, date } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [flights, setFlight] = useState([]);
  const [departure, setDeparture] = useState(source);
  const [arrival, setArrival] = useState(destination);
  const [newDate, setNewDate] = useState(date);
  const [maxCost, setMaxCost] = useState('');
  const [maxLayovers, setMaxLayovers] = useState('');

  useEffect(() => {
    fetch(
      `https://bookmyflights-server.onrender.com/flights/getFlightsBySourceAndDestination/${source}/${destination}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFlight(result.filter(flight => flight.departureTime.split('T')[0] === date));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [source, destination, date])

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

  return (
    <div className='list'>
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Filters</h5>
              <input type="text" className="form-control" placeholder='Departure City' value={departure} onChange={e => setDeparture(e.target.value)} />
              <input type="text" className="form-control" placeholder='Arrival City' value={arrival} onChange={e => setArrival(e.target.value)} />
              <input type="date" className="form-control" placeholder='Departure Date' value={newDate} onChange={e => setNewDate(e.target.value)} />
              <input type="number" className="form-control" placeholder='Max Cost' value={maxCost} onChange={e => setMaxCost(e.target.value)} />
              <input type="number" className="form-control" placeholder='Max Layovers' value={maxLayovers} onChange={e => setMaxLayovers(e.target.value)} />
              <button className="btn btn-primary" onClick={() => navigate(`/flights/${departure}/${arrival}/${newDate}`)}>Search</button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="column">
            {console.log(flights)}
            {flights
              .filter(flight => maxCost !== '' ? Math.min(...flight.prices) <= maxCost : true)
              .filter(flight => maxLayovers !== '' ? flight.layovers ? flight.layovers.length <= maxLayovers : true : true)
              .map((Flight) => (
                <FlightCard flight={Flight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightList