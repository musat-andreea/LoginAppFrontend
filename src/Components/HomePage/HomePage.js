import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import axios from "axios";
import { fetchWeatherApi } from 'openmeteo';
import { TiWeatherPartlySunny } from "react-icons/ti";
import './HomePage.css';


const HomePage = () => {

    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);

    const [user, setUser] = useState({
        id: 0,
        email: '',
        name: '',
        location: '',
    });

    const [weather, setWeather] = useState({
        temperature: '',
        description: '',
        icon: '',
      });

        const fetchWeatherData = async () => {
            if(lat && long) {
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max`;

                const response = await axios.get(url);
                setWeather({
                    temperature: response.data.daily.temperature_2m_max[0],
                    description: 'Max temperature of the day',
                    icon: 'https://static.vecteezy.com/system/resources/previews/012/806/421/original/3d-cartoon-weather-icon-of-partly-cloudy-sign-of-sun-and-cloud-isolated-on-transparent-background-illustration-of-3d-render-png.png'
                })
            }
          };
    
    useEffect(() => {
        const access_token = Cookies.get('jwt_authorization');

        const decoded = jwtDecode(access_token);
        setUser(decoded);
    }, [])

    const getCoordinatestFromLocation = async (location) => {
        if (location)   {
            /**
             * @todo
             * this key should be moved to backend or a secret storage
             */
            const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${location}`, {headers: {
                'X-Api-Key': 'S0/Taxs8mbgz5lvHjlSGBQ==HrtkLAkay6QpyMwl'
            }});

            if (response.data.length > 0)   {
                const firstMatch = response.data[0];
                setLat(firstMatch.latitude);
                setLong(firstMatch.longitude);
            }
        }
    }

    useEffect(() => {
        getCoordinatestFromLocation(user.location);
    }, [user]);

    useEffect(() => {     
        fetchWeatherData();
    }, [lat, long]);

    return (
        <>
    <Container style={{background: 'none'}} className='mt-5'>
      <Card className="user-card p-0 mb-0" style={{background: 'white'}}>
        <Row>
          <Col md={4} className="text-center">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="user-avatar"
            />
          </Col>
          <Col md={8} >
            <Card.Body>
              <Card.Title className="text-center">User Profile</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Name:</strong> {user.name}
                <br />
                <strong>Location:</strong> {user.location}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Last updated: {new Date(user.updatedAt).toLocaleString()}
              </small>
            </Card.Footer>
          </Col>
        </Row>
      </Card>

      <Card className="weather-card p-0">
        <Row>
          <Col md={4} className="text-center">
            <Card.Img
              variant="top"
              src={weather.icon}
              alt="Weather Icon"
              className="weather-icon"
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title className="text-center">Weather Information</Card.Title>
              <Card.Text>
                <strong>Temperature:</strong> {weather.temperature} °C
                <br />
                <strong>Description:</strong> {weather.description}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
        </>
    );
   
}

export default HomePage