import React, {Component} from 'react';

class HistoryTable extends Component {

    constructor(props) {
        super(props);
    }

    get_table_rows(){
        const items = []

        for (const [index, value] of this.props.weather_history.entries()) {
          items.push(
            <tr key={index}>
                <td className="text-center">{value.city}</td>
                <td className="text-center">{value.temperature}</td>
                <td className="text-center">{value.humidity}</td>
                <td className="icon text-center">
                    <img alt={value.icon} src={"http://openweathermap.org/img/wn/"+value.icon+".png"}></img>
                </td>
            </tr>
          )
        }
        return items
    }

    render (){

        return (
            <table className="table">
                <thead>
                    <tr>
                    <th className="text-center" scope="col">City <i className="fas fa-city"></i></th>
                    <th className="text-center" scope="col">Temperature <i className="fas fa-thermometer-half"></i></th>
                    <th className="text-center" scope="col">Humidity <i className="fas fa-tint"></i></th>
                    <th className="text-center" scope="col">Icon <i className="fas fa-cloud"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {this.get_table_rows()}
                </tbody>
            </table>
        )
    }
}

export default HistoryTable;