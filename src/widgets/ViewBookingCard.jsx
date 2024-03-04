import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ViewBookingCard({ ticket }) {
    const navigate = useNavigate();
    const [flight, setFlight] = useState({});

    const handleDelete = async (id, flightId) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) {
            return;
        }
        const response = await fetch(`https://bookmyflights-server.onrender.com/tickets/deleteTicket/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (response.ok) {
            const incrementResponse = await fetch(`https://bookmyflights-server.onrender.com/flights/incrementSeats/${flightId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            });
            if (!incrementResponse.ok) {
                alert('An error occurred incrementing the flight seats');
                return;
            }
            alert('Booking deleted successfully');
            navigate('/');
        } else {
            alert('An error occurred deleting the booking');
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
                }
            }
        }
        const getFlight = async () => {
            const response = await fetch(`https://bookmyflights-server.onrender.com/flights/getFlight/${ticket.flightId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const flight = await response.json();
                setFlight(flight);
            }
        }
        checkLogin();
        getFlight();
    }, []);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{flight.source} - {flight.destination}</h5>
                <p className="card-text">
                    Passenger Name: {ticket.fullName}<br />
                    Seat Number: {ticket.seatNumber}<br />
                    <hr />
                    Airlines: {flight.airlines && flight.airlines.join(', ')}<br />
                    Flight Numbers: {flight.flightNumbers && flight.flightNumbers.join(', ')}<br />
                    Departure: {new Date(flight.departureTime).toLocaleString()}<br />
                    Arrival: {new Date(flight.arrivalTime).toLocaleString()}<br />
                </p>
                <button
                    style={{ width: '100%' }}
                    onClick={() => handleDelete(ticket.ticketId, flight.flightId)}
                    className="btn btn-danger"
                >
                    Delete Booking
                </button>
            </div>
        </div>
    )
}

export default ViewBookingCard