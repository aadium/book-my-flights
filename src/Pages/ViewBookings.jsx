import { useEffect, useState } from "react"
import ViewBookingCard from "../widgets/ViewBookingCard";

function ViewBookings(params) {
    const [user, setUser] = useState({});
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('https://bookmyflights-server.onrender.com/auth/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'token': localStorage.getItem('token')
                }
            });
            if (response.ok) {
                const user = await response.json();
                setUser(user);
                getTickets(user);
            }
        }
        const getTickets = async (user) => {
            const response = await fetch('https://bookmyflights-server.onrender.com/tickets/getTickets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            if (response.ok) {
                const tickets = await response.json();
                const userTickets = tickets.filter(ticket => ticket.passengerId === user.id);
                console.log(userTickets);
                setTickets(userTickets);
            }
        }
        getUser();
    }, [])
    return (
        <div style={{
            width: "90%",
            margin: "auto"
        }}>
            <h1>Your Bookings</h1>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }}>
                {tickets.map(ticket => (
                    <div style={{flex: '0 0 30%'}}>
                        <ViewBookingCard ticket={ticket} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewBookings