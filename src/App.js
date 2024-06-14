

import logo from "./logo.svg";
import "./App.css"; // External CSS file
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherDisplay from './WeatherDisplay ';
import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";

function App() {
  const [searchCity, setSearchCity] = useState("London"); // Default city
  const [inputValue, setInputValue] = useState({ lat: "", lon: "" });
  const [fetchParams, setFetchParams] = useState({ city: "London", lat: "", lon: "" });
  const [weatherData, setWeatherData] = useState({});
  const [isDayTime, setIsDayTime] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError("");
      let url = `https://api.openweathermap.org/data/2.5/weather?appid=82b326caadf7a1df1ac3fef5033f0271&units=metric`;

      if (fetchParams.city) {
        url += `&q=${fetchParams.city}`;
      } else if (fetchParams.lat && fetchParams.lon) {
        url += `&lat=${fetchParams.lat}&lon=${fetchParams.lon}`;
      } else {
        throw new Error("Please enter the correct location.");
      }

      const response = await axios.get(url);
      
      
      if (response.data.cod !== 200) {
        throw new Error("Location not found. Please enter a valid location.");
      }

      setWeatherData(response?.data);

      setInputValue({
        ...inputValue,
        lat: response?.data.coord.lat,
        lon: response?.data.coord.lon,
      });

      const currentTime = new Date().getTime() / 1000; // current time in seconds
      const { sunrise, sunset } = response.data.sys;
      setIsDayTime(currentTime >= sunrise && currentTime < sunset);
      
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError(error.message || "Error fetching weather data.");
      setWeatherData({}); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [fetchParams]);

  const handleInputChange = (e) => {
    setSearchCity(e.target.value);
  };

  const handleLatChange = (e) => {
    setInputValue({ ...inputValue, lat: e.target.value });
  };

  const handleLonChange = (e) => {
    setInputValue({ ...inputValue, lon: e.target.value });
  };

  const handleSearch = () => {
    setFetchParams({ city: searchCity, lat: inputValue.lat, lon: inputValue.lon });
    setSearchCity(""); // Clear searchCity input field
   
  };

  return (
    <Container className="App">
      <Card className="weather-card">
        <Card.Body>
          <Card.Title>Weather Search</Card.Title>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={searchCity}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLatitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Latitude"
                    value={inputValue.lat}
                    onChange={handleLatChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLongitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Longitude"
                    value={inputValue.lon}
                    onChange={handleLonChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {Object.keys(weatherData).length !== 0 && !error && (
        <WeatherDisplay
          weatherData={weatherData}
          isDayTime={isDayTime}
          loading={loading}
        />
      )}
    </Container>
  );
}

export default App;
