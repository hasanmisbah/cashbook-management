<template>
  <aside
    :class="{ 'active' : !showSideBar }"
    class="sidebar-nav-wrapper"
  >
    <div class="navbar-logo">
      <router-link :to="{ name: routeMap.home.name }">
        <img alt="logo" src="../../assets/images/logo/logo.svg"/>
      </router-link>
    </div>
    <nav class="sidebar-nav">
      <ul>
        <nav-item :route=" routeMap.home "/>
        <nav-item :route=" routeMap.expenseSource "/>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { useStore } from "vuex";
import { defineComponent, computed, reactive, toRefs } from "vue";
import routeMap from "../../utils/routeMap";
import NavItem from "../../Components/Utils/NavItem";

export default defineComponent({
  name: 'SideBar',
  components: { NavItem },
  setup() {
    const store = useStore();
    const state = reactive({
      showSideBar: computed(() => store.state.app.showSidebar)
    })
    return {
      ...toRefs(state),
      routeMap
    }
  },
})
</script>

<style>
.sidebar-nav-wrapper {
  overflow-y: auto;
}
</style>
