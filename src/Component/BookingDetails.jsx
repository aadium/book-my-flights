import {  Outlet} from 'react-router-dom'
import Search from './Service/Search'
import SearchList from './Service/SearchList'
import CheckIn from './CheckIn'

function BookingDetails() {
  return (
    <div className='bookingdetails'>
    




    
        <Search/> 
      
       <SearchList/>  

     
      
      <Outlet/>
    </div>
  )
}

export default BookingDetails