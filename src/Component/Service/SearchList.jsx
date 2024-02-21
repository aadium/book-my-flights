import {Navigate, useNavigate} from "react-router-dom"
import { useState ,useEffect } from 'react';
import axios from 'axios'

function SearchList() {

    let Navigate = useNavigate();
    const [Flight, setFlight]= useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buttonPopup, setPopup] = useState(false);

    useEffect(() => {
        fetch("https://bookmyflights-server.onrender.com/flights/getFlight")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setFlight(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
      const CheackIn=(id)=>{
         axios.post(`https://bookmyflights-server.onrender.com/flights/saveFlight`)
        .then(
            Navigate("/cheack-in", {ammount: Flight.seatsAvailable})
        )

       

       }

  return (
    <div>
    
    <div className='SearchCon'>
    <table className=''>
    <thead >
        <tr>
            <th></th>
            <div className='TableHead'>
            <th>flightDurations</th>
            <th>airlines</th>
            <th>seatsAvailable</th>
            </div>
            <th></th>
        </tr>
    </thead>

    <tbody>
     {Flight.map(Flight => (
  <tr key={Flight.id}>
    <td>
        <img className='logoImage' src="https://www.nicepng.com/png/detail/114-1141340_infinite-flight-logo-png.png" alt="" />
    </td>
            <div className='TD'>
          <td >{Flight.flightDurations}</td>
          <td >{Flight.airlines}</td>
          <td >{Flight.seatsAvailable}</td>
          </div>
          <td>
            <button  className='button-49' type='submit' onClick={()=>CheackIn(Flight.id)}>Book</button>
            </td>

  </tr>

        ))}
            </tbody>
            </table>
        </div>

    </div>
  )
}

export default SearchList