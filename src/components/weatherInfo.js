import React, { Component } from 'react';

class WeatherInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() { 

        return(

            <div id="weather-info">
                <div className="location-container">

                {
                    this.props.country && this.props.city && 
                    this.props.city+", "+this.props.country
                }

                </div> 

                {
                    this.props.description && 
                    <div className="element description">
                        <div className="content">
                            {this.props.description} 
                            <img 
                                src={"http://openweathermap.org/img/wn/"+this.props.icon+"@2x.png"}
                                alt={this.props.description}>
                            </img>
                        </div>
                    </div>
                }

                {
                    this.props.temperature && 
                    <div className="element temperature">
                        <div className="content ">
                            <div className="text">{this.props.temperature} ºC</div>
                            <div className="image"><i className="fas fa-thermometer-half"></i></div>
                        </div>
                    </div>
                }

                {
                    this.props.humidity && 
                    <div className="element humidity">
                        <div className="content">
                            <div className="text">{this.props.humidity} %</div>
                            <div className="image"><i className="fas fa-tint"></i></div>
                        </div>
                    </div>
                }
            </div>

        )

    }

}
 
export default WeatherInfo