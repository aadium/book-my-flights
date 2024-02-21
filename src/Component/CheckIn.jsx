import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './checkin.css';

function CheckIn() {
    let navigate = useNavigate();

    const [Flight, setFlight]= useState(
        []
        );
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
    
        useEffect(() => {
            fetch("http://localhost:8080/Flight-Booking/getFlight")
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
          const [Passenger, setPassenger]= useState({
            firstName:null,
            lastName: null,
            phone:null,
            email:null,
            gender: null,
            age:null,
            address: null,
            city: null,
            pincode:null
        });
    
    const {firstName,lastName, email,phone, gender,age,  address, city, pincode}=Passenger;

    const onChange = e=>{
		setPassenger({...Passenger,[e.target.name]: e.target.value});
	};
	const onSubmit= async e=>{
		e.preventDefault();
		await axios.post("http://localhost:8080/savePassenger",Passenger)
        .then(
            alert("SUBMIT"),
            useNavigate.navagite("/payment", {})
        )
	};

  return (
    
    
    <div className='CheckIn'>
     <div className='popup'>
         <h2 className='hedu'>Basic Information</h2>
         <div className='fr'>
        <form className='frg' onSubmit={e=>onSubmit(e)}>
            <img src="" alt="" />
            <label id='togivespace'for="fristName" aria-hidden="true">First Name</label>
            <label   id='secondspaces' className='Lsatname'  for="LastName" aria-hidden="true"> Last Name</label>
            <br />
            <input 
                type="text" 
                name='firstName'
                required='required'
                value={firstName}
                placeholder='Enter your Fast name '
                onChange={e=>onChange(e)}/> 
                <input 
                type="text" 
                name="lastName"
                required='required'
                value={lastName}
                className='last'
                placeholder='Enter your last name'
                onChange={e=>onChange(e)}/> 
                
                <br />
                <label  id='togivespace' for="phone" aria-hidden="true">Phone Number</label>
                <label id='secondspace' className='email' for="email" aria-hidden="true">Email Id</label>
                <br />
            <input
                 type="number" 
                 name='phone'
                required='required'
                value={phone}
                 placeholder='Phone'
                 onChange={e=>onChange(e)}/>
            <input 
                type="email" 
                name='email'
                required='required'
                value={email}
                className='last'
                placeholder='Email'onChange={e=>onChange(e)}
                />
                <br />
                <label id='togivespace' for="age" aria-hidden="true">Your Date of Birth</label>
                <label className='gender' for="gender" aria-hidden="true">Select your Gender</label>
                <br />
            <input 
                type="date" 
                name="age"
                required='required'
                value={age}
                placeholder='Age'
                onChange={e=>onChange(e)}/>   

        <input className='radio' type="radio" name="gender" value="Male" id="Male" required onChange={e=>onChange(e)}/>
        <label  id='male'for="Male" value="male">Male</label>
        <input type="radio" name="gender"  value="Female" id="Female" required onChange={e=>onChange(e)}/>
        <label id='female'for="Female" value="Female">Female</label>
        <input type="radio" name="gender"  value="Other" id="Other" required onChange={e=>onChange(e)}/>
        <label for="Other" value="Other">Other</label>
        
        <br /> <br />
        <label for="address">Address</label><br />
        <textarea name="address" value={address} id="address" cols="30" rows="3" placeholder="Write your full address"></textarea>
            <br />
            <label id='togivespace' for="city">City</label>
            <label className='pin' for="pincode">Pincode</label><br />
            <input
                 type="text" 
                 name='city'
                required='required'
                value={city}
                 placeholder='City'
                 onChange={e=>onChange(e)}/>
            <input 
                type="text" 
                name='pincode'
                required='required'
                value={pincode}
                className='last'
                placeholder='Pincode'onChange={e=>onChange(e)}
                />
            <br /> <br />
            <button className='CheckIn' type='submit'>Check- in</button>
        </form>
        </div>
           
        </div>
    </div>
)

    
   
}

export default CheckIn