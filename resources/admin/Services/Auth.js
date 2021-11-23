import Api from './Api';
import { CURRENT_USER, LOGIN, LOGOUT } from '../utils/urls';
import http from '../Plugin/http';

export default class Auth extends Api{

  static user = () => this.getResponse(() => http.get(CURRENT_USER));
  static login = (data) => this.getResponse(() => http.post(LOGIN, data));
  static logout = () => this.getResponse(() => http.post(LOGOUT));
}
