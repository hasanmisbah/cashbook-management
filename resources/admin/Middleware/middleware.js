import { reactive, computed, toRefs, watch } from 'vue';
import store from '../store'
import routeMap from '../utils/routeMap';
import router from '../router';

export default function () {

  const state = reactive({
    isAuthenticated: computed(() => store.state.user.isAuthenticated),
    isBootstrapped: computed(() => store.state.app.isBootstrapped)
  });


  const bootstrapApp = () => store.dispatch('app/bootStrapApp');

  const validateUserIsAuthenticated = async () => {

    if (state.isBootstrapped.value) {
      return state.isAuthenticated.value
    }

    await bootstrapApp();

    return state.isAuthenticated
  }

  watch(() => state.isAuthenticated, async (nv) => {

    if (!nv) {
      return await router.push({ name: routeMap.auth.login.name })
    }
  })

  return {
    ...toRefs(state),
    validateUserIsAuthenticated
  }
}
