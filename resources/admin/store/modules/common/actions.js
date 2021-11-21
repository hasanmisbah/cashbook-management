export default {
    setLoading: ({ commit }, payload) => commit('updateLoading', payload),
    setData: ({ commit }, payload) => commit('updateData', payload),
    setErrors: ({ commit }, payload) => commit('updateErrors', payload),
    setErrorMsg: ({ commit }, payload) => commit('updateErrorMsg', payload),
}
