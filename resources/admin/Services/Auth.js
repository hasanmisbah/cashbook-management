import Api from './Api';
import { CURRENT_USER } from '../utils/urls';

export default class Auth extends Api{

  static user = () => this.getResponse(() => this.http.get(CURRENT_USER));
}
