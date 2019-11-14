
import React from 'react';
import './css/App.css';

// components

import Form from './components/form'
import WeatherInfo from './components/weatherInfo'

const api_key = "a05f4cc77a91b03c44d8233d0bb69d73"

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }
  

  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${api_key}`)
    const response = await api_call.json()
    
    if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        error: ""
      })
    }else{
      this.setState({
        error: "Please, fill the blanks"
      })
    }
    
    console.log(response)
    
  }

  render() {
   return (
    <div>
      <div id="main-container" className="container">
        <div className="row">
          <div className="col-md-6 form-container">
            <Form 
              loadWeather={this.getWeather}
              error={this.state.error}
            />
          </div>
          <div className="col-md-6 results-container">
            <WeatherInfo
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              icon={this.state.icon}
            />
          </div>
        </div>
      </div>
    </div>
   ) 
 }

}
  
export default App;
