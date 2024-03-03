import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FlightCard({ flight }) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this flight?')) {
            return;
        }
        const response = await fetch(`https://bookmyflights-server.onrender.com/flights/deleteFlight/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            alert('Flight deleted successfully');
            navigate('/');
        } else {
            alert('An error occurred deleting flight');
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const response = await fetch('https://bookmyflights-server.onrender.com/auth/checkLogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.ok) {
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
                    if (user.roles === 'ROLE_ADMIN') {
                        setIsAdmin(true);
                    }
                }
            }
        }
        checkLogin();
    }, []);

    return (
        <div key={flight.id} className="col-md-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{flight.source} - {flight.destination}</h5>
                    <p className="card-text">
                        Airlines: {flight.airlines && flight.airlines.join(', ')}<br />
                        Flight Numbers: {flight.flightNumbers && flight.flightNumbers.join(', ')}<br />
                        Departure: {new Date(flight.departureTime).toLocaleString()}<br />
                        Arrival: {new Date(flight.arrivalTime).toLocaleString()}<br />
                        Available Seats: {flight.seatsAvailable}<br />
                        Layovers: {flight.layovers && flight.layovers.join(', ')}<br />
                        Layover Durations: {flight.layoverDurations && flight.layoverDurations.join(', ')}
                    </p>
                    {
                        isAdmin ? (
                            <button
                                style={{ width: '100%' }}
                                onClick={() => handleDelete(flight.flightId)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        ) : (
                            <button style={{ width: '100%' }} onClick={() => handleNavigate(flight.flightId)} className="btn btn-dark mt-2">Book</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FlightCard