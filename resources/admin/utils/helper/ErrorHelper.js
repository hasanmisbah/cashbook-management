export default class ErrorHelper {
  static mapServerError (error, mapperCb) {

    // getting errors & message
    const errors = error.errors;
    const errorMessage = error.message || 'Something went wrong!';

    if (!errors) return;

    /**
     * Extracts first error if available
     * @param error : String|Symbol
     * @return String|False
     */
    const extractError = (error) => error?.[0] || '';

    // execute the map
    mapperCb(errors, extractError);

    // return error message
    return errorMessage;
  }
}
