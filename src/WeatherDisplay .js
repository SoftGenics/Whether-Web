
import React, { useState } from "react";
import MapDisplay from './MapDisplay';
import { Card, Row, Col, Button, Spinner } from "react-bootstrap"; // Import Spinner from react-bootstrap
import { WiDaySunny, WiNightClear } from "react-icons/wi";

const WeatherDisplay = ({ weatherData, isDayTime, loading }) => {
  const [temperatureUnit, setTemperatureUnit] = useState("metric");

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  if (loading || !weatherData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          
        </Spinner>
      </div>
    );
  }

  const { main, weather, wind, coord } = weatherData;

  const temperature = temperatureUnit === "metric" ? main.temp : (main.temp * 9/5) + 32;
  const temperatureSymbol = temperatureUnit === "metric" ? "°C" : "°F";

  return (
    <div>
      <Card className="weather-card">
        <Card.Body>
          <Card.Title>Weather in {weatherData.name}</Card.Title>

          <Row className="weather-item">
            <Col md={6}>
              <strong>Temperature:</strong>
            </Col>
            <Col md={4}>
              {temperature.toFixed(1)} {temperatureSymbol} 
              {isDayTime ? (
                <WiDaySunny size={24} color="#FDB813" />
              ) : (
                <WiNightClear size={24} color="#1F2937" style={{ transform: "scale(1.5)" }} />
              )}
            </Col>
            <Col md={2}>
              <Button variant="primary" size="sm" onClick={toggleTemperatureUnit}>
                {temperatureUnit === "metric" ? "°F" : "°C"}
              </Button>
            </Col>
          </Row>

          <Row className="weather-item">
            <Col md={6}>
              <strong>Condition:</strong>
            </Col>
            <Col md={6}>
              {weather[0].description}
            </Col>
          </Row>

          <Row className="weather-item">
            <Col md={6}>
              <strong>Humidity:</strong>
            </Col>
            <Col md={6}>
              {main.humidity}%
            </Col>
          </Row>

          <Row className="weather-item">
            <Col md={6}>
              <strong>Wind Speed:</strong>
            </Col>
            <Col md={6}>
              {wind.speed} m/s
            </Col>
          </Row>

          <Row className="weather-item">
            <Col md={6}>
              <strong>Chance of Rain:</strong>
            </Col>
            <Col md={6}>
              {weather[0].main === "Rain" ? "High" : "Low"}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <MapDisplay initialLat={coord.lat} initialLng={coord.lon} initialZoom={10} />
    </div>
  );
};

export default WeatherDisplay;
