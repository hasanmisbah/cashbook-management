import { isEmpty } from 'lodash';

export default {
  hasData: (state) => !isEmpty(state.data),
  loading: (state) => state.loading,
  data: (state) => state.data,
  errors: (state) => state.errors,
  errorMsg: (state) => state.errorMsg,
}
