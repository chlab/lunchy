import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <div>
    		<div className="card-block">
				<h4 className="card-title">Add a restaurant</h4>	
			</div>
			<div className="card-block">
				<fieldset className="form-group">
				  <input type="text" id="restaurant" autofocus className="form-control" placeholder="Start typing the name of a restaurant.." />
				</fieldset>	
				<div className="card-block">
					<a href="#" className="card-link">add</a>
					<a className="card-link" href="{% url 'lunch:index' %}">back</a>
				</div>
			</div>
		</div>
  }
}

render(<App/>, document.getElementById('app-container'));