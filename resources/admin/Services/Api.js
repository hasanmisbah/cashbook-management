import http from '../Plugin/http';
import { GET_COOKIE } from '../utils/urls';

export default class Api {

  static cookieFetched = false

  static http = http

  static getCookie = async () => {

    if (this.cookieFetched) {
      return;
    }

    await http.get(GET_COOKIE);
    this.cookieFetched = true;
  }

  static failedResponse = (error) => {

    const response = {
      message: 'Something went wrong, Please Try Again Later',
      status: false,
      statusCode: 500,
      errors: [],
    };

    if (!error.response) {
      return response;
    }

    response.message = error.response.statusText || error.response.data?.message || error.message;

    // Specifically Catch error message because of avoiding Generic Error Message
    if (error.response.data?.message) {
      response.message = error.response.data?.message;
    }

    response.errors = error.response.data?.errors || [];
    response.statusCode = error.response.status || 500;

    return Promise.reject(response);
  };

  static getResponse = async (callback) => {

    try {

      if (!this.cookieFetched) {
        await this.getCookie();
      }

      return await callback();

    } catch (e) {

      return this.failedResponse(e);

    }
  };
}
