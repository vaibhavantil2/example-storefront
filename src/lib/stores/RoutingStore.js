import { action, toJS, observable } from "mobx";
import { Router } from "routes";

/**
 * A mobx store for routing data
 * @class AuthStore
 */

export default class RoutingStore {
  /**
   * The pathname of the current page (i.e. `/tags/shop`)
   *
   * @type String
   */
  @observable pathname = "";

  /**
   * The query params for the current page (i.e. `{shop: `1234', first: 24}`)
   *
   * @type Object
   */
  @observable query = {};

  @action updateRoute({ pathname, query }) {
    this.pathname = pathname;
    this.query = query;
  }

  /**
   * Set a query string for the current route
   * @name setSearch
   * @param {String} search Search query string first=1&after=123
   * @returns {String} full url with query string
   */
  @action setSearch(search) {
    const _query = { ...toJS(this.query), ...search };

    let urlQueryString = "";
    Object.keys(_query).forEach((key, index, arr) => {
      urlQueryString += `${key}=${_query[key]}`;

      if (index < arr.length - 1) {
        urlQueryString += "&";
      }
    });

    const path = `${this.pathname}?${urlQueryString}`;
    Router.pushRoute(path, path, { shallow: true });
    return path;
  }
}