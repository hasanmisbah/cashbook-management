import commonState from '../common/state';
import commonMutations from '../common/mutations';
import commonActions from '../common/actions';
import commonGetters from '../common/getters';
import state from '../common/state';
import Auth from '../../../Services/Auth';

export default {
  namespaced: true,

  state: () => ({
    ...commonState,
    isAuthenticated: false
  }),

  getters: {
    ...commonGetters,
  },

  mutations: {
    ...commonMutations,
    updateIsAuthenticated: (state, payload) => state.isAuthenticated = payload,
  },

  actions: {
    ...commonActions,
    setIsAuthenticated: ({ commit }, payload) => commit('updateIsAuthenticated', payload),

    async fetchAuthenticatedUser({ dispatch }) {

      try {

        const response = await Auth.user()
        dispatch('setData', response.data.data)
        dispatch('setIsAuthenticated', true)

      } catch (e) {

        dispatch('setData', {})
        dispatch('setErrors', e.errors)
        dispatch('setErrorMsg', e.message)
        dispatch('setIsAuthenticated', false)

      }
    },

    async tryLogin(context, payload) {
      try {
        return await Auth.login(payload)
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async tryLogout({ dispatch }) {

      try {

        const response =  await Auth.logout();
        dispatch('setIsAuthenticated', false)
        dispatch('setData', {})

      }catch (e) {

        dispatch('setData', {})
        dispatch('setErrors', e.errors)
        dispatch('setErrorMsg', e.message)

      }
    }
  }
}
