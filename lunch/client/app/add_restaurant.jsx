import React from 'react'
import {render} from 'react-dom'
import 'typeahead.js'
import Bloodhound from 'bloodhound-js'
import $ from 'jquery'
import {bind, filter, contains} from 'underscore'
import {facebook} from './config'

/**
 * This is a wrapper around twitters Typeahead library that searches
 * nearby places to eat on facebook
 */
class FacebookFindAsYouType extends React.Component {
	/**
	 * Setup typeahead when component is mounted in dom
	 */
	componentDidMount() {
		var params = {
			q: 'QUERY',
			type: 'place',
			// @todo get location from geolocation api
			center: '46.9479739,7.447446799999966',
			distance: 5000, // in m
			access_token: facebook.token
		};

		var categories = ['Restaurant/cafe', 'Bar', 'Cafe'];
		// possible improvement: also include "Local business",
		// then search data.category_list for all these categories again

		// setup bloodhound datasource
		var fbApi = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				wildcard: 'QUERY',
				url: 'https://graph.facebook.com/v2.6/search?' + $.param(params),
				transform: (response) => {
					return filter(response.data, (place) => contains(categories, place.category));
				}
			}
		});

		// init typeahead
		$(this.refs.restaurant).typeahead(null, {
			source: fbApi,
			displayKey: 'name'
		}).focus();

		// write selected facebook_id to form when a place is selected or cursor hovers over it
		$(this.refs.restaurant).bind('typeahead:cursorchange typeahead:select', (e, place) => {
			$(this.refs.facebook_id).val(place.id);
		});
	}

	/**
	 * Render component
	 */
	render() {
		return <div>
				<input type="hidden" name="facebook_id" ref="facebook_id" />
				<div className="card-block text-xs-center">
					<h4 className="card-title">Add a restaurant</h4>	
				</div>
				<div className="card-block">
					<fieldset className="form-group">
						<div className="input-group">
					 		<input autocomplete="off" type="text" ref="restaurant" name="restaurant" autofocus className="form-control" placeholder="Start typing the name of a restaurant.." />
		 					<span className="input-group-btn">
		 		          		<button className="btn btn-secondary" type="submit">Add</button>
		 		        	</span>
					 	</div>
					</fieldset>	
					<div className="card-block text-xs-center">
						<a className="card-link" href="/">back</a>
					</div>
				</div>
			</div>
  }
}

// not sure how to do this nicer
window.fbAsyncInit = () => {
  FB.init({
    appId      : facebook.appId,
    xfbml      : true,
    version    : 'v2.6'
  });
  render(<FacebookFindAsYouType/>, $('#search-form').get(0));
};
