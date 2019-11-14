import React, { Component } from 'react';

class Title extends Component {

  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() { 
    return (
      <div>
        <h1 className="title">Titulo</h1>
        <p className="subtitle"> Esto y aquello  </p>
      </div>
    )
  }

}
 
export default Title;
 