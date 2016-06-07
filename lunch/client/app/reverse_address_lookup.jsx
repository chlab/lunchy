import React from 'react'
import {render} from 'react-dom'
import $ from 'jquery'

export default class AddressReverseLookup extends React.Component {
    render() {
        return <div>
            <div className="card-block">
                <fieldset className="form-group">
                    <div className="input-group">
                        <input type="text" ref="address" name="address" autofocus className="form-control" placeholder="Where are you located?" />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Add</button>
                        </span>
                    </div>
                </fieldset>
            </div>
        </div>
    }
}
