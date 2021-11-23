import state from '../common/state';
import getters from '../common/getters';
import mutations from '../common/mutations';
import actions from '../common/actions';
import ExpenseSource from '../../../Services/ExpenseSource';

export default {
  namespaced: true,

  state: () => ({
    ...state
  }),

  getters: {
    ...getters
  },

  mutations: {
    ...mutations
  },

  actions: {
    ...actions,

    async getExpenseSource({ dispatch }) {
      try {
        const response = await ExpenseSource.get()
        dispatch('setData', response.data.data)
      } catch (e) {
        dispatch('setData', {})
        dispatch('setErrors', e.errors)
        dispatch('setErrorMsg', e.message)
      }
    }
  }
}
