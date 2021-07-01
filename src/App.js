import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllCities } from "./services/cityService";
import { RegisterCustomer } from "./services/authService";
function App() {
  const [cities, setCities] = useState([]);

  const register = async (customer) => {
    const data = {
      CityCode: 41320000,
      PostalCode: "1112223334",
      Mobile: "09901892788",
      Tel: "06136278223",
      NationID: "231242343",
      customerName: "soodi",
      Address: "شیراز",
    };
    const result = await RegisterCustomer(data);
    console.log(result);
  };
  useEffect(() => {
    const populateCities = async () => {
      const response = await getAllCities();
      const cities = response.data.data;
      setCities(cities);
    };

    populateCities();
  }, []);
  return (
    <div className="App">
      <mark>Register an Customer</mark>
      <br></br>
      <br></br>
      <button onClick={() => register()}>Register</button>
      <br></br>
      <br></br>
      <mark>List of All Cities</mark>
      <ul>
        {cities &&
          cities.map((city) => <p key={city.cityId}>{city.cityName}</p>)}
      </ul>
    </div>
  );
}

export default App;
