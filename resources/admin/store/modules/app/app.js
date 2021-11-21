import commonState from '../common/state';
import commonMutations from '../common/mutations';
import commonActions from '../common/actions';
import commonGetters from '../common/getters';

export default {
    namespaced: true,

    state: ()=> ({
        ...commonState,
        showSidebar: true
    }),

    getters: {
        ...commonGetters,
    },

    mutations: {
        ...commonMutations,
        updateSidebar: (state, payload) => state.showSidebar = payload,
    },

    actions: {
        ...commonActions,
        toggleSidebar: ({ commit, state }, payload) => commit('updateSidebar', !state.showSidebar)
    }
}
