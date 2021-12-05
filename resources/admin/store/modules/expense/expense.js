import state from '../common/state';
import getters from '../common/getters';
import mutations from '../common/mutations';
import actions from '../common/actions';
import Expense from '../../../Services/Expense';
import { isEmpty } from 'lodash';

export default {

  namespaced: true,

  state: () => ({
    ...state
  }),

  getters: {
    ...getters,
    data: (state) => isEmpty(state.data) ? [] : state.data
  },

  mutations: {
    ...mutations
  },

  actions: {
    ...actions,

    async getExpense({ dispatch }) {

      try {

        const response = await Expense.get()
        dispatch('setData', response.data.data)

      } catch (e) {

        dispatch('setData', {})
        dispatch('setErrors', e.errors)
        dispatch('setErrorMsg', e.message)

      }

    },

    async createExpense({ dispatch, state }, payload) {


      try {

        const response = await Expense.create(payload);
        const updatedState = [response.data.data, ...state.data]

        dispatch('setData', updatedState)
        return response;

      } catch (e) {

        return e;
      }
    },

    async updateExpense({ dispatch, state }, {id, payload } ){

      const currentState = [ ...state.data ]

      try{

        const response = await Expense.update(id, payload)
        const updatedStore = currentState.map((source) => source.id === id ? response.data.data : source);
        dispatch('setData', updatedStore);
        return response;

      }catch (e) {

        return e;

      }
    },

    async deleteExpense({ dispatch, state }, id) {

      dispatch('setLoading', true)

      const currentState = [...state.data];

      try {

        const response = await Expense.delete(id);

        const updatedState = currentState.filter((item) => item.id !== id)

        dispatch('setData', updatedState);
        dispatch('setLoading', false)

        return response;
      } catch (e) {

        dispatch('setLoading', false)

        return e;
      }
    }

  }
}
