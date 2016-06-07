import React from 'react'
import $ from 'jquery'

/**
 * Component that displays info from facebook about a place
 */
export default class DynamicImage extends React.Component {
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
