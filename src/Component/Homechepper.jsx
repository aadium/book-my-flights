import React from 'react'
import { useState, useEffect } from 'react';

function Homechepper() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
      // Assuming you fetch flight data from an API
      // Replace this with your actual API call
      const fetchData = async () => {
        try {
          const response = await fetch('your-api-endpoint');
          const data = await response.json();
          setFlights(data);
        } catch (error) {
          console.error('Error fetching flight data:', error);
        }
      };
  
      fetchData();
    }, []); // Run the effect only once on component mount
  
    const filteredFlights = flights.filter(flight => {
      return flight.price < 100000 && flight.departureTime === 'your-departure-date';
    });

  return (
    <div className='Fare' >
    <h3> Chepper flight Details </h3>
    <table className='Fares'>
    <thead className=' TableHead justify-content-center align-items-center'>
    <tr>
      <th>Source</th>
      <th>Destination</th>
      <th>Departure Time</th>
      <th>departureTime</th>
      <th>Prices</th>
    </tr>
    </thead>
    <tbody className='Farecol justify-content-center align-items-center'>
    {filteredFlights.map((flight, index) => (
      <td key={index}>
        Source: {flight.source},
        Destination: {flight.destination},
        Duration: {flight.Durations},
        departureTime: {flight.departureTime},
        Price: {flight.prices}
      </td>
    ))}
    </tbody>
    </table>
    </div>
  )
}

export default Homechepper