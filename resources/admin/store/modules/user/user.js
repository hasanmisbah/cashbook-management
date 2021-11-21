import commonState from '../common/state';
import commonMutations from '../common/mutations';
import commonActions from '../common/actions';
import commonGetters from '../common/getters';

export default {
    namespaced: true,

    state: ()=> ({
        ...commonState,
    }),

    getters: {
        ...commonGetters,
    },

    mutations: {
        ...commonMutations,
    },

    actions: {
        ...commonActions,
    }
}
