import Api from './Api';
import { GET_EXPENSE, CREATE_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../utils/urls';

export default class Expense extends Api {

  static get = () => this.getResponse(() => this.http.get(GET_EXPENSE));

  static create = (data) => this.getResponse(() => this.http.post(CREATE_EXPENSE, data));

  static update = (id, data) => this.getResponse(() => this.http.patch(`${ UPDATE_EXPENSE }/${ id }`, data));

  static delete = (id) => this.getResponse(() => this.http.delete(`${ DELETE_EXPENSE }/${ id }`));

}
