import { reactive, computed, toRefs } from 'vue';
import store from '../store'

export default function () {

  const state = reactive({
    isAuthenticated: computed(() => store.state.user.isAuthenticated),
    isBootstrapped: computed(() => store.state.app.isBootstrapped)
  })

  const bootstrapped = () => store.dispatch('app/setBootstrapped', true);
  const toggleAuthenticated = () => store.dispatch('app/setBootstrapped', !state.isAuthenticated);

  return {
    ...toRefs(state)
  }
}
