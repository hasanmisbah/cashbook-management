<template>
  <li class="nav-item nav-item-has-children">
    <a
      :class="{ collapsed : !isActive || !isActiveRoute(routeGroup)}"
      @click="isActive = !isActive"
    >
      <span v-if="!!icon" class="icon">
        <i :class="icon"></i>
      </span>
      <span class="text">{{ title }}</span>
    </a>
    <ul
      :class="{show : isActive || isActiveRoute(routeGroup)}"
      class="collapse dropdown-nav"
    >
      <li v-for="(navigation, index) in routeGroup" :key="`navigation-group${index}`">
        <router-link :to="{name: navigation.name}"> {{ navigation.title }}</router-link>
      </li>
    </ul>
  </li>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { isActiveRoute } from '../../utils/helper';

export default defineComponent({
  name: 'NavItemGroup',
  props: {

    routeGroup: {
      type: Array
    },

    icon: {
      type: String,
      required: false
    },

    title: {
      type: String
    }
  },
  setup() {
    const state = reactive({
      isActive: false
    });

    return {
      ...toRefs(state),
      isActiveRoute
    }
  },
})
</script>
