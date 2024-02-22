
<<<<<<< Updated upstream

import React, { useState, useEffect } from "react";
import "./about.css";

function About() {
=======
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add this line
import './about.css';

function About() {
  const Navigate = useNavigate();
>>>>>>> Stashed changes
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    departureTime: "",
<<<<<<< Updated upstream
=======
    seatsAvailable:'',
>>>>>>> Stashed changes
    cost: null,
    flightNames: [],
    stops: null,
    duration: null,
  });

  useEffect(() => {
    // Fetch flights from your API
    // Replace 'apiEndpoint' with your actual API endpoint
        fetch("https://bookmyflights-server.onrender.com/flights/getFlight")
      .then((response) => response.json())
      .then((data) => {
        setFlights(data);
        setFilteredFlights(data); // Initial load with all flights
      })
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleCheckboxChange = (flightName) => {
    const updatedFlightNames = [...filters.flightNames];

    if (updatedFlightNames.includes(flightName)) {
      updatedFlightNames.splice(updatedFlightNames.indexOf(flightName), 1);
    } else {
      updatedFlightNames.push(flightName);
    }

    handleFilterChange("flightNames", updatedFlightNames);
  };

  const getUniqueFlightNames = () => {
    return [...new Set(flights.map((flight) => flight.name))];
  };

  const handleSearch = () => {
    // Perform flight search logic using the input values (source, destination, date)
    console.log(`Searching for flights from ${filters.source} to ${filters.destination} on ${filters.departureTime}`);

<<<<<<< Updated upstream
=======
    const CheackIn = (id) => {
      // Assuming 'id' is the identifier of the selected flight
      const selectedFlight = flights.find(flight => flight.id === id);

      // Ensure a flight is found before proceeding
      if (selectedFlight) {
        axios.post(`https://bookmyflights-server.onrender.com/flights/saveFlight`, selectedFlight)
          .then(() => Navigate("/cheack-in", { amount: selectedFlight.seatsAvailable }));
      } else {
        console.error("Error: Flight not found");
      }
    };



>>>>>>> Stashed changes
    // You can implement your flight search logic here, such as making an API call
    // For the sake of example, let's assume searchResults is an array of filtered flights
    const filterFlights = () => {
      let filtered = flights;

      if (filters.source) {
        filtered = filtered.filter(
          (flight) => flight.source.toLowerCase() === filters.source.toLowerCase()
        );
      }

      if (filters.destination) {
        filtered = filtered.filter(
          (flight) => flight.destination.toLowerCase() === filters.destination.toLowerCase()
        );
      }

      if (filters.date) {
        filtered = filtered.filter((flight) => flight.date === filters.date);
      }

      if (filters.cost !== null) {
        filtered = filtered.filter((flight) => flight.cost <= filters.cost);
      }

      if (filters.flightNames.length > 0) {
        filtered = filtered.filter((flight) =>
          filters.flightNames.includes(flight.name)
        );
      }

      if (filters.stops !== null) {
        filtered = filtered.filter((flight) => flight.stops === filters.stops);
      }

      if (filters.duration !== null) {
        filtered = filtered.filter((flight) => flight.duration === filters.duration);
      }

      setFilteredFlights(filtered);
    };

    filterFlights();
  };

  const handleIncrement = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: (prevFilters[filterName] || 0) + 1,
    }));
  };

  const handleDecrement = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: Math.max((prevFilters[filterName] || 0) - 1, 0),
    }));
  
  };

  const handleIncrementDuration = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      duration: (prevFilters.duration || 0) + 1,
    }));
  };
  
  const handleDecrementDuration = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      duration: Math.max((prevFilters.duration || 0) - 1, 0),
    }));
  };

  const handleSortByPrice = () => {
    // Toggle sorting order
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";

    // Sort flights based on cost
    const sortedFlights = [...filteredFlights].sort((a, b) => {
      return newSortOrder === "asc" ? a.cost - b.cost : b.cost - a.cost;
    });

    setFilteredFlights(sortedFlights);
    setSortOrder(newSortOrder);
  };

  const handleSortByLowerToHigherPrice = () => {
    // Sort flights based on cost in ascending order
    const sortedFlights = [...filteredFlights].sort((a, b) => a.cost - b.cost);

    setFilteredFlights(sortedFlights);
    setSortOrder("asc"); // Set the sorting order to ascending
  };

<<<<<<< Updated upstream
=======
 

>>>>>>> Stashed changes
  return (
    
    <div className="container">
    <div className="filters_pp2">
     <div className="search_input1">
<<<<<<< Updated upstream


      <div id='toflex'>
      <div className="source">
        <label className="label" htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
        />
      </div>

      <div className="destination">
        <label className="label" htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={filters.destination}
          onChange={(e) => handleFilterChange('destination', e.target.value)}
        />
      </div>

      <div className="date">
=======
      <div className="input-group">
        <label className="label" htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="label" htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={filters.destination}
          onChange={(e) => handleFilterChange('destination', e.target.value)}
        />
      </div>

      <div className="input-group">
>>>>>>> Stashed changes
        <label className="label" htmlFor="date">Date:</label>
        <input
          type="date" // Consider using a date picker library for better user experience
          id="date"
          name="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
        
<<<<<<< Updated upstream
        <button id='buttonspaces' onClick={handleSearch}>Search Flights</button>

        <button id='buttonspaces' onClick={handleSortByPrice}>Sort by Price (High to Low)</button>
        <button id='buttonspaces' onClick={handleSortByLowerToHigherPrice}>Sort by Price (Low to High)</button>
        </div>


=======
        <button onClick={handleSearch}>Search Flights</button>

        <button onClick={handleSortByPrice}>Sort by Price (High to Low)</button>
        <button onClick={handleSortByLowerToHigherPrice}>Sort by Price (Low to High)</button>
        
>>>>>>> Stashed changes
      </div>
      </div>
      </div>
      

<<<<<<< Updated upstream

<div id='flexboxes'>


=======
>>>>>>> Stashed changes
      <div className="filters_pp4">
     <div className="filters_pp3">
    <div className="filters_pp1">
     
    <div className="input-group">
<<<<<<< Updated upstream

      <div id='costspace'>
=======
>>>>>>> Stashed changes
    <label className="label" htmlFor="cost">Cost:</label>
    <input
      id="cost"
      name="cost"
      min="0"
      max="100000"
      step="1000"
      value={filters.cost || ''}
      onChange={(e) => handleFilterChange('cost', parseInt(e.target.value, 10))}
    />
<<<<<<< Updated upstream
    <span id='costing'>{filters.cost}</span>
=======
    <span>{filters.cost}</span>
>>>>>>> Stashed changes

    {/* Increment and Decrement buttons for cost */}
    <button onClick={() => handleIncrement('cost')}>Increment</button>
    <button onClick={() => handleDecrement('cost')}>Decrement</button>
  </div>
<<<<<<< Updated upstream
  </div>


<div id='flightnamesspace'>
=======

>>>>>>> Stashed changes
      <div className="input-group">
        <label className="label">Flight Names:</label>
        <div className="checkbox-group">
          {getUniqueFlightNames().map((flightName) => (
            <div key={flightName}>
              <input
                type="checkbox"
                id={flightName}
                name={flightName}
                checked={filters.flightNames.includes(flightName)}
                onChange={() => handleCheckboxChange(flightName)}
              />
              <label htmlFor={flightName}>{flightName}</label>
            </div>
          ))}
        </div>
      </div>
<<<<<<< Updated upstream
      </div>


<div id='stopsspace'>
=======

>>>>>>> Stashed changes
      <div className="input-group">
        <label className="label" htmlFor="stops">Stops:</label>
        <input
          type="range"
          id="stops"
          name="stops"
          min="0"
          max="5"
          step="1"
          value={filters.stops || ''}
          onChange={(e) => handleFilterChange('stops', parseInt(e.target.value, 10))}
        />
<<<<<<< Updated upstream
        <span id='stoping'>{filters.stops}</span>
      </div>
      </div>




<div id='durationspace'>
=======
        <span>{filters.stops}</span>
      </div>

>>>>>>> Stashed changes
      <div className="input-group">
      <label className="label" htmlFor="duration">Duration:</label>
      <input
        id="duration"
        name="duration"
        min="0"
        max="90 "
        step="1"
        value={filters.duration || ''}
        onChange={(e) => handleFilterChange('duration', parseInt(e.target.value, 10))}
      />
<<<<<<< Updated upstream
      <span id='hours'>{filters.duration} hours</span>

      {/* Increment and Decrement buttons for duration */}
      <button id='hours1' onClick={handleIncrementDuration}>+ Hours</button>
      <button id='hours2' onClick={handleDecrementDuration}>- Hours</button>
    </div>
      </div>
      </div>
      </div>
      </div>


<div id='toflexxx'>
      <div className="ll1_list">
        <h2>filtered flights</h2>
=======
      <span>{filters.duration} hours</span>

      {/* Increment and Decrement buttons for duration */}
      <button onClick={handleIncrementDuration}>+ Hours</button>
      <button onClick={handleDecrementDuration}>- Hours</button>
    </div>
      </div>
      </div>

      <div className="ll1_list">
        <h2>Filtered Flights</h2>
>>>>>>> Stashed changes
        <ul>
          {filteredFlights.map((flight) => (
            <li key={flight.id}>
              <div>Source: {flight.source}</div>
              <div>Destination: {flight.destination}</div>
              <div>Date: {flight.date}</div>
              <div>Cost: {flight.cost}</div>
              <div>Name: {flight.name}</div>
              <div>Stops: {flight.stops}</div>
              <div>Duration: {flight.duration}</div>
            </li>
          ))}
        </ul>
<<<<<<< Updated upstream
        </div>
        </div>
      
=======
      </div>
>>>>>>> Stashed changes
      </div>
    </div>

  )
  }

export default About