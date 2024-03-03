import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookFlight() {
    const navigate = useNavigate();
    const id = useParams().id;
    const [flight, setFlight] = useState(null);
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [classType, setClassType] = useState('');
    const [seatNumber, setSeatNumber] = useState('');
    const [numberOfBags, setNumberOfBags] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        try {
            const userResponse = await fetch('https://bookmyflights-server.onrender.com/auth/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'token': localStorage.getItem('token')
                }
            });
            if (userResponse.ok) {
                const user = await userResponse.json();
                setUser(user);
                setFullName(user.fullName);
                setEmail(user.email);
                setBillingAddress(user.billingAddress);
            }
            const flightsResponse = await fetch(`https://bookmyflights-server.onrender.com/flights/getFlight/${id}`);
            if (flightsResponse.ok) {
                const jsonResponse = await flightsResponse.json();
                setFlight(jsonResponse);
            } else {
                const errorData = await flightsResponse.json();
                alert(errorData.message);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            alert('An error occurred fetching user');
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.roles !== 'ROLE_USER') {
            alert('You must be logged in as a user to book a flight');
            return;
        }
        const response = fetch('https://bookmyflights-server.onrender.com/tickets/saveTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                flightId: id,
                passengerId: user.id,
                fullName,
                email,
                billingAddress,
                classType,
                seatNumber,
                checkedInBagsAmount: numberOfBags,
            }),
        });
        if (response.ok) {
            alert('Flight booked successfully');
            navigate('/');
        } else {
            alert('An error occurred booking the flight');
        }
    };

    if (!flight) {
        return <div>Loading...</div>;
    }

    function formatDuration(duration) {
        const [hours, minutes] = duration.split(':').map(Number);
        let formattedDuration = '';
        if (hours > 0) {
            formattedDuration += `${hours} hr${hours > 1 ? 's' : ''}`;
        }
        if (minutes > 0) {
            formattedDuration += ` ${minutes} min${minutes > 1 ? 's' : ''}`;
        }
        return formattedDuration.trim();
    }

    return (
        <div>
            <div style={{ textAlign: 'center', width: '75%', margin: 'auto' }} className='card'>
                <h1>Flight Itinerary</h1>
                <hr />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className='card' style={{ textAlign: 'center', padding: '5px 20px' }}>
                        <p className='h5'>Source: {flight.source}</p>
                        <p className='h5'>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
                    </div>
                    {flight.layovers && flight.layovers.map((layover, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '1px', height: '100px', background: 'black', position: 'relative' }}>
                                <p className='h6' style={{ position: 'absolute', top: '40%', left: '-50px', transform: 'translateY(-50%)' }}>{flight.flightNumbers[index]}</p>
                                <p className='h6' style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>{formatDuration(flight.flightDurations[index])}</p>
                            </div>
                            <div className='card' style={{ padding: '5px 20px' }}>
                                <p className='h5'>Location: {layover}</p>
                                <p className='h5'>Layover: {formatDuration(flight.layoverDurations[index])}</p>
                            </div>
                        </div>
                    ))}
                    <div style={{ width: '1px', height: '100px', background: 'black', position: 'relative' }}>
                        <p className='h6' style={{ position: 'absolute', top: '40%', left: '-50px', transform: 'translateY(-50%)' }}>{flight.flightNumbers[flight.flightNumbers.length - 1]}</p>
                        <p className='h6' style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>{formatDuration(flight.flightDurations[flight.flightNumbers.length - 1])}</p>
                    </div>
                    <div className='card' style={{ textAlign: 'center', padding: '5px 20px' }}>
                        <p className='h5'>Destination: {flight.destination}</p>
                        <p className='h5'>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
                    </div>
                    <br />
                </div>
            </div>
            <br />
            <form onSubmit={handleSubmit} className="container">
                <div className="mb-3">
                    <label className="form-label">Full Name:</label>
                    <input type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email ID:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Class:</label>
                    <select name="class" onChange={(e) => setClassType(e.target.value)} className="form-select">
                        {flight.classes.map((classOption, index) => (
                            <option key={index} value={classOption}>{classOption} : {flight.prices[index]} Rs</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Seat Number:</label>
                    <input type="text" name="seatNumber" value={seatNumber} onChange={(e) => setSeatNumber(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Number of Bags:</label>
                    <input type="number" name="numberOfBags" value={numberOfBags} onChange={(e) => setNumberOfBags(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Billing Address:</label>
                    <input type="text" name="billingAddress" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Book Flight</button>
            </form>
        </div>
    );
}

export default BookFlight;