import React, {Component} from 'react';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            suggested_cities:[],
            selected_city:"",
            selected_country_code:"",
            show_list:false,
            timeoutsearch:undefined
        }
    }

    handleChange = async(event) => {
        const text = event.target.value
        
        if (text.length < 2) {
            this.setState({
                suggested_cities:[],
                show_list:false,
            })
            return false
        }
        if(this.state.timeoutsearch){
            clearTimeout(this.state.timeoutsearch)
        }

        this.setState({
            timeoutsearch:setTimeout(async ()=>{
                const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&languageCode=es&namePrefix=${text}`
                const api_call = await fetch(url)
                const response = await api_call.json()
                const data = response.data
                const state_data = data.length > 0 ? data:[]
                
                this.setState({
                    suggested_cities:state_data,
                    show_list:true,
                    timeoutsearch:undefined
                })
            }, 1500)
        })


    }

    clickElementCityList = (event) => {
        const element = event.currentTarget
        const city = element.getElementsByClassName('city')[0].textContent
        const country = element.getElementsByClassName('country')[0].textContent
        const country_code = element.getElementsByClassName('country-code')[0].textContent
        const input_element = document.getElementById('input_city')
        const btn_get_weather = document.getElementsByClassName('btn-get-weather')[0]

        input_element.value = ""

        this.setState({
            suggested_cities:[],
            show_list:false,
            selected_city:city,
            selected_country_code:country_code
        },() => {
            btn_get_weather.click()
        })

    }

    handleSubmit = (event) => {

        event.preventDefault()

        console.log(event.target)

        return this.props.loadWeather(event)

    }

    avoidSubmitWithEnterKey = (e) => {
        if (e.key === 'Enter') 
        e.preventDefault();
    }

    render (){
        return (
            <form className="city-form" onSubmit={this.handleSubmit}>
                <input
                    onKeyPress={this.avoidSubmitWithEnterKey}
                    autoComplete="off"
                    onChange={this.handleChange} 
                    data_city={this.state.selected_city}
                    data_country_code={this.state.selected_country_code}
                    type="text" 
                    name="city" 
                    placeholder="Look for a city..."
                    id="input_city"
                />
                <div className='city-list-container'>
                
                {   
                    this.state.show_list &&
                    this.state.suggested_cities.map(
                        city => <div className='element' onClick={this.clickElementCityList} key={city.id}>
                                    <div className="place-name"> 
                                        <span className="font-weight-bold city">{city.city}</span>, 
                                        <span className="country"> {city.country}</span>
                                        <span className="country-code d-none">{city.countryCode}</span>
                                    </div>
                                    <div className="place-type"> 
                                        <span className="badge badge-pill">{city.type}</span>
                                    </div>
                                </div>
                    )
                }
                </div>
                {
                    this.state.timeoutsearch &&
                    <div className="text-center mt-2 loading-icon-container">    
                        <i className="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                }
                <button className="btn-get-weather d-none">Get Weather</button>
                {
                this.props.error && 
                    <div className="error">{this.props.error}</div>
                }
            
            </form>
        )
    }
}

export default Form;