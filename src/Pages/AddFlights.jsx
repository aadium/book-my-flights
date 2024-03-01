import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

function AddFlights() {
  let navigate = useNavigate();

  const [airlines, setAirlines] = useState([]);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [flightDurations, setFlightDurations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState(0);
  const [layovers, setLayovers] = useState([]);
  const [layoverDurations, setLayoverDurations] = useState([]);
  const [classes, setClasses] = useState([]);
  const [prices, setPrices] = useState([]);

  const [airlinesText, setAirlinesText] = useState('');
  const [flightNumbersText, setFlightNumbersText] = useState('');
  const [flightDurationsText, setFlightDurationsText] = useState('');
  const [layoversText, setLayoversText] = useState('');
  const [layoverDurationsText, setLayoverDurationsText] = useState('');
  const [seatsAvailableText, setSeatsAvailableText] = useState('');
  const [classesText, setClassesText] = useState('');
  const [pricesText, setPricesText] = useState('');

  const handleChange = () => {
    const layoversArray = layoversText != '' ? layoversText.split(', ') : [];
    const layoverDurationsArray = layoverDurationsText != '' ? layoverDurationsText.split(', ') : [];
    const classesArray = classesText != '' ? classesText.split(', ') : [];
    const pricesArray = pricesText != '' ? pricesText.split(', ') : [];

    setAirlines(airlinesText.split(', '));
    setFlightNumbers(flightNumbersText.split(', '));
    setFlightDurations(flightDurationsText.split(', '));
    setLayovers(layoversArray);
    setLayoverDurations(layoverDurationsArray);
    setSeatsAvailable(parseInt(seatsAvailableText));
    setClasses(classesArray);
    setPrices(pricesArray);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {}
    if (layovers.length > 0 && layoverDurations.length > 0) {
      data = {
        airlines,
        flightNumbers,
        flightDurations,
        source,
        destination,
        departureTime,
        arrivalTime,
        seatsAvailable,
        layovers,
        layoverDurations,
        classes,
        prices
      };
    } else {
      data = {
        airlines,
        flightNumbers,
        flightDurations,
        source,
        destination,
        departureTime,
        arrivalTime,
        seatsAvailable,
        classes,
        prices
      };
    }
    await fetch('https://bookmyflights-server.onrender.com/flights/saveFlight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(data),
    }).then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className='addFlight'>
      <h1 className='hOne'>ADD FLIGHTS</h1>
      <form onSubmit={handleSubmit}>
        <center>
          <table className='addFlightFormTable'>
            <tr>
              <td>Airlines</td>
              <td>
                <input type="text" placeholder='airline1, airline2' value={airlinesText} onChange={(e) => setAirlinesText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Flight Numbers</td>
              <td>
                <input type="text" placeholder='fln1, fln2' value={flightNumbersText} onChange={(e) => setFlightNumbersText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Flight Durations</td>
              <td>
                <input type="text" placeholder='hh:mm:ss, hh:mm:ss' value={flightDurationsText} onChange={(e) => setFlightDurationsText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Departure Location</td>
              <td>
                <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Arrival Location</td>
              <td>
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Departure Time</td>
              <td>
                <input
                  type="datetime-local"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value.toString())}
                />
              </td>
            </tr>
            <tr>
              <td>Arrival Time</td>
              <td>
                <input
                  type="datetime-local"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value.toString())}
                />
              </td>
            </tr>
            <tr>
              <td>Seats Available</td>
              <td>
                <input type="number" value={seatsAvailableText} onChange={(e) => setSeatsAvailableText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Classes</td>
              <td>
                <input type="text" placeholder='class1, class2' value={classesText} onChange={(e) => setClassesText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Prices</td>
              <td>
                <input type="text" placeholder='price1, price2' value={pricesText} onChange={(e) => setPricesText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Layovers</td>
              <td>
                <input type="text" placeholder='airport1, airport2' value={layoversText} onChange={(e) => setLayoversText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Layover Durations</td>
              <td>
                <input type="text" placeholder='hh:mm:ss, hh:mm:ss' value={layoverDurationsText} onChange={(e) => setLayoverDurationsText(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button type="submit" className='button-30' onClick={handleChange}>Add Flight</button>
              </td>
            </tr>
          </table>
        </center>
      </form>
    </div>
  )
}

export default AddFlights
