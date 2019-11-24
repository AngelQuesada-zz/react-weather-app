
import React from 'react';
import './css/App.css';

// components

import Navbar from './components/navbar'
import Form from './components/form'
import WeatherInfo from './components/weatherInfo'
import HistoryTable from './components/historyTable'

// data

import weather_images_list from './data/weather_condition_names.json'

// others

const api_key = "a05f4cc77a91b03c44d8233d0bb69d73"

// media

const images = require.context('../public/images', true);

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
      weather_main: undefined,
      weather_history:[]
    }
  }

  getImage = () => {

    for (const key in weather_images_list) {
      if(key === this.state.weather_main){
        return images("./"+weather_images_list[key])
      } 
    }
    return images("./weather_background.png")

  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.elements.city.attributes.data_city.value
    const country = e.target.elements.city.attributes.data_country_code.value
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${api_key}`)
    const response = await api_call.json()

    if(city && country){

      if(response.cod === "404"){
        this.setState({
          error: `No results for that city`
        })
        return false
      }

      const new_weather = {
        temperature: response.main.temp,
        city: city,
        country: country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        weather_main:response.weather[0].main
      }

      const weather_history = this.state.weather_history

      if (weather_history.length == 5) weather_history.pop()

      weather_history.unshift(new_weather)
      
      this.setState({
        temperature: new_weather.temperature,
        city: new_weather.city,
        country: new_weather.country,
        humidity: new_weather.humidity,
        description: new_weather.description,
        icon: new_weather.icon,
        weather_main: new_weather.weather_main,
        weather_history:weather_history,
        error: ""
      })

    }else{
      this.setState({
        error: "Please, fill the blanks"
      })
    }
    
  }

  historyTable = () => {
    const weather_history = this.state.weather_history
    if (weather_history.length > 0){
      return (
      <HistoryTable 
        weather_history={this.state.weather_history}
      />
      )
    }
  }

  render() {

  return (
    <div>
    <Navbar/>
    <div id="main-container" className="container">
      <div className="row">
        <div className="col-md-6 form-container">
          <Form 
            loadWeather={this.getWeather}
            error={this.state.error}
          />
          {this.historyTable()}
        </div>
        <div 
          className="col-md-6 results-container"
          style= {{backgroundImage: `url(${this.getImage()})`}}
        >
          <WeatherInfo
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            weather_main={this.state.weather_main}
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
