export default {
    updateLoading: (state, payload) => state.loading = payload,
    updateData: (state, payload) => state.data = payload,
    updateErrors: (state, payload) => state.errors = payload,
    updateErrorMsg: (state, payload) => state.errorMsg = payload,
}
