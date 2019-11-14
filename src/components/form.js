import React, {Component} from 'react';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render (){
        return (
            <form onSubmit = {this.props.loadWeather}>
                <input type="text" name="city" placeholder="City..." />
                <input type="text" name="country" placeholder="Country..." />
                <button className="btn-get-weather btn btn-block">Get Weather</button>
                {
                this.props.error && 
                    <div className="error">{this.props.error}</div>
                }
            </form>
        )
    }
}

export default Form;