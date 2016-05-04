import React from 'react'
import {render} from 'react-dom'
import typeahead from 'typeahead.js'
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
			// @todo move out of this file
			access_token: facebook.token
		}

		var categories = ['Restaurant/cafe', 'Bar'];

		// setup bloodhound datasource
		var fbApi = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace('name'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				wildcard: 'QUERY',
				url: 'https://graph.facebook.com/v2.6/search?' + $.param(params),
				transform: function(response) {
					return filter(response.data, function(place) {
						return contains(categories, place.category);
					});
				}
			}
		});

		// init typeahead
		$(this.refs.restaurant).typeahead(null, {
			source: fbApi,
			displayKey: 'name'
		}).focus();

		// write selected facebook_id to form when a place is selected or cursor hovers over it
		$(this.refs.restaurant).bind('typeahead:cursorchange typeahead:select', bind(function(e, place) {
			$(this.refs.facebook_id).val(place.id);
		}, this));
	}

	/**
	 * Submit form and save restaurant
	 */
	save(e) {
		$('form[name=add_restaurant]').submit();
		e.preventDefault();
		return false;
	}

	/**
	 * Render component
	 */
	render() {
		return <div>
				<input type="hidden" name="facebook_id" ref="facebook_id" />
				<div className="card-block">
					<h4 className="card-title">Add a restaurant</h4>	
				</div>
				<div className="card-block">
					<fieldset className="form-group">
					  <input autocomplete="off" type="text" ref="restaurant" name="restaurant" autofocus className="form-control" placeholder="Start typing the name of a restaurant.." />
					</fieldset>	
					<div className="card-block">
						<a href="#" className="card-link" onClick={this.save}>add</a>
						<a className="card-link" href="/">back</a>
					</div>
				</div>
			</div>
  }
}

// not sure how to do this nicer
window.fbAsyncInit = function() {
  FB.init({
    appId      : facebook.appId,
    xfbml      : true,
    version    : 'v2.6'
  });
  render(<FacebookFindAsYouType/>, $('#search-form').get(0));
}