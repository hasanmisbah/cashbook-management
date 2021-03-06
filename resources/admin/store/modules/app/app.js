import commonState from '../common/state';
import commonMutations from '../common/mutations';
import commonActions from '../common/actions';
import commonGetters from '../common/getters';

export default {
  namespaced: true,

  state: () => ({
    ...commonState,
    showSidebar: true,
    isBootstrapped: false
  }),

  getters: {
    ...commonGetters,
  },

  mutations: {
    ...commonMutations,
    updateSidebar: (state, payload) => state.showSidebar = payload,
    updateIsBootstrapped: (state, payload) => state.isBootstrapped = payload
  },

  actions: {
    ...commonActions,
    toggleSidebar: ({ commit, state }, payload) => commit('updateSidebar', !state.showSidebar),
    setBootstrapped: ({ commit, state }, payload) => commit('updateIsBootstrapped', payload),

    async bootStrapApp({ dispatch, state }){

      if(state.isBootstrapped){
        return
      }

      await dispatch('user/fetchAuthenticatedUser', {} ,{root: true});

      dispatch('setBootstrapped', true);
    },
  }
}
