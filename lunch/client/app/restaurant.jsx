import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'
import {facebook} from './config'

/**
 * Component that displays info from facebook about a place
 */
class DynamicImage extends React.Component {
	componentDidMount() {
		$(this.refs.wrapper).animate({opacity: 1})
	}

	/**
	 * Render component
	 */
	render() {
		return <span className="img-circle-wrapper" ref="wrapper">
			<img ref="pic" className="img-circle" src={this.props.src} />
		</span>

  }
}

// is it bad to bind to a window event in a module?
window.fbAsyncInit = function() {
	FB.init({
		appId      : facebook.appId,
		xfbml      : true,
		version    : 'v2.6'
	});

	FB.api('/' + $('#place-facebook-id').val() + '/picture', 'get', {
		type: 'large',
		access_token: facebook.token
		}, 
		function(r) {
			render(<DynamicImage src={r.data.url}/>, $('#restaurant-pic').get(0));
		});

  /*FB.api('/' + facebook_id, 'get', {
  	fields: ['location', 'about', 'picture{url, type=large}'],
  	access_token: facebook.token
  }, function(r) {
  })*/
}