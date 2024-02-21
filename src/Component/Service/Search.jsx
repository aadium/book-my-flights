import { useState, useEffect } from 'react';

function Search() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [Flight, setFlight] = useState([]);
  const [SerchFlight, setSerchFlight] = useState({
    source: null,
    destination: null,
    flightNumbers: null
  });
  const { source, destination, flightNumbers } = SerchFlight;
  const onChange = e => {
    setSerchFlight({ ...SerchFlight, [e.target.name]: e.target.value });
  };
  const OnClick = async e => {
    fetch(`https://bookmyflights-server.onrender.com/flights/source=${source}}&destination=${destination}&flightNumbers=${flightNumbers}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setFlight(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    console.log(setFlight)
  }

  return (
    <div className='from'>

      <form action='/searchList'>
        <div className='Search'>
          <label htmlFor='From' className='lable'>source</label>
          <input
            type="text"
            name='source'
            required="required"
            onChange={e => onChange(e)}
            className='to' />
          <label htmlFor='To' className='lable'>destination</label>
          <input
            type="text"
            name='destination'
            required="required"
            onChange={e => onChange(e)}
            className='to' />
          <label for="Depart" className='lable'>flightNumbers</label>
          <span id="date-format"></span>
          <input
            type="text"
            name='flightNumbers'
            required="required"
            onChange={e => onChange(e)}
            className='to' />
          <br /><br /><br />
          <button type='submit' className='button' onClick={e => OnClick(e)} >Search Flight</button>
        </div>
      </form>

              <div>
              
              
              </div>

    </div>
  )
}

export default Search