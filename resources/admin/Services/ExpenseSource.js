import Api from './Api';
import { CREATE_EXPENSE_SOURCE, DELETE_EXPENSE_SOURCE, GET_EXPENSE_SOURCE, UPDATE_EXPENSE_SOURCE } from '../utils/urls';

export default class ExpenseSource extends Api {

  static get = () => this.getResponse(() => this.http.get(GET_EXPENSE_SOURCE));

  static create = (data) => this.getResponse(() => this.http.post(CREATE_EXPENSE_SOURCE, data));

  static update = (id, data) => this.getResponse(() => this.http.patch(`${ UPDATE_EXPENSE_SOURCE }/${ id }`, data));

  static delete = (id) => this.getResponse(() => this.http.post(`${ DELETE_EXPENSE_SOURCE }/${ id }`));

}
