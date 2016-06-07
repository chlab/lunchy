import $ from 'jquery';
import {render} from 'react-dom'
import React from 'react'
import AddressReverseLookup from './reverse_address_lookup.jsx';
import DynamicImage from './restaurant.jsx';
import FacebookFindAsYouType from './add_restaurant.jsx';
import {facebook} from './config'

((win) => {

    /**
     * Quick and simple implementation of a router
     * If I end up needing anything fancier, I will use something fancier
     */
    class Router {
        constructor() {
            var route = $(document.body).data('route');

            switch (route) {
                case 'add_restaurant':
                    this.addRestaurant();
                    break;

                case 'restaurant_detail':
                    this.restaurantDetail();
                    break;

                default:
                    this.index();
                    break;
            }
        }

        /**
         * Render index view
         * @return {void}
         */
        index() {
            render(<AddressReverseLookup/>, $('#place-search').get(0));
        }

        /**
         * Render restaurant detail view
         * @return {void}
         */
        restaurantDetail() {
            window.fbAsyncInit = () => {
                FB.init({
                    appId: facebook.appId,
                    xfbml: true,
                    version: 'v2.6'
                });

                FB.api('/' + $('#place-facebook-id').val() + '/picture', 'get', {
                    type: 'large',
                    access_token: facebook.token
                    }, r => {
                        render(<DynamicImage src={r.data.url}/>, $('#restaurant-pic').get(0));
                    });
            };
        }

        /**
         * Render add restaurant view
         * @return {void}
         */
        addRestaurant() {
            win.fbAsyncInit = () => {
              FB.init({
                appId      : facebook.appId,
                xfbml      : true,
                version    : 'v2.6'
              });
              render(<FacebookFindAsYouType/>, $('#search-form').get(0));
            };
        }
    }

    return new Router();

})(window);
