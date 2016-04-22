import React from 'react';
import {render} from 'react-dom';
import typeahead from 'typeahead.js'
import Bloodhound from 'bloodhound-js'
import $ from 'jquery'
import _ from 'underscore'

class App extends React.Component {
	/**
	 * Setup typeahead when component is mounted in dom
	 */
	componentDidMount() {
		var params = {
			q: 'QUERY',
			type: 'place',
			// @todo get location from geolocation api
			center: '46.9479739,7.447446799999966',
			// @todo move out of this file
			access_token: '1425312674163488|8Hpa_wPQgRhOFUsGIdKkUO7g3Pk'
		}

		// setup bloodhound datasource
		var fbApi = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				wildcard: 'QUERY',
				url: 'https://graph.facebook.com/v2.6/search?' + $.param(params),
				transform: function(response) {
					console.log(_.where(response.data, {category: 'Restaurant/cafe'}))
					return _.where(response.data, {category: 'Restaurant/cafe'});
				}
			}
		});

		$(this.refs.restaurant).typeahead(null, {
			source: fbApi,
			displayKey: 'name'
		}).focus();
	}

	/**
	 * Render component
	 */
	render() {
		return <div>
				<div className="card-block">
					<h4 className="card-title">Add a restaurant</h4>	
				</div>
				<div className="card-block">
					<fieldset className="form-group">
					  <input autocomplete="off" type="text" ref="restaurant" autofocus className="form-control" placeholder="Start typing the name of a restaurant.." />
					</fieldset>	
					<div className="card-block">
						<a href="#" className="card-link">add</a>
						<a className="card-link" href="{% url 'lunch:index' %}">back</a>
					</div>
				</div>
			</div>
  }
}

// is it bad to bind to a window event in a module?
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1425312674163488',  // @todo swap this out
    xfbml      : true,
    version    : 'v2.6'
  });

  render(<App/>, document.getElementById('app-container'));
}