import {Link} from 'react-router-dom'

function Header() {
  return (
    <nav className='nav'>
    <div className='logo'>
    <h1>Book My Flights</h1>
    </div>

    <ul>
      <li>
        <Link className='link' to="/">Home</Link>
      </li>
      <li>
        <Link className='link' to="/about">Search Flight</Link>
      </li>
      <li>
        <Link className='link' to="/ticket">Booking</Link>
      </li>
      <li>
        <Link className='link' to="/bookingdetails">Booking List</Link>
      </li>

      <li>
      <Link className='link' to="/CheckIn">CheackIn</Link>
    </li>

      <li>
        <Link className='link' to="/service/s1/s2/s3">Service</Link>
      </li>

      <div className='signin'>
      <li>
        <Link className='link' to="/signup">SignUp</Link>
      </li>
      <li>
        <Link className='link' to="/register">Register</Link>
      </li>
      </div>
      
    </ul>


  </nav>
      
   
  )
}

export default Header
