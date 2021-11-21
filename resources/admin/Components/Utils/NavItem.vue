<template>
  <li
    :class="{active: isActiveRoute(route.name)}"
    class="nav-item"
  >
    <router-link :to="{ name: route.name }">
      <span v-if="!!route.icon" class="icon">
        <i :class="route.icon"></i>
      </span>
      <span class="text">{{ route.title }}</span>
    </router-link>
  </li>
</template>

<script>
import { defineComponent } from 'vue'
import { isActiveRoute } from '../../utils/helper';

export default defineComponent({
  name: 'NavItem',
  props: {
    route: {
      type: Object
    }
  },
  setup() {
    return {
      isActiveRoute
    }
  }
})
</script>

<style scoped>

</style>
