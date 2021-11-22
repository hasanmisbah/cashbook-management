import commonState from '../common/state';
import commonMutations from '../common/mutations';
import commonActions from '../common/actions';
import commonGetters from '../common/getters';
import state from '../common/state';

export default {
    namespaced: true,

    state: ()=> ({
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
      setIsAuthenticated: (commit, payload) => commit('updateIsAuthenticated', payload)
    }
}
