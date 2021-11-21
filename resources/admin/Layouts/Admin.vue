<template>
    <!-- ======== sidebar-nav start =========== -->
    <side-bar/>
    <div class="overlay"></div>
    <!-- ======== sidebar-nav end =========== -->

    <!-- ======== main-wrapper start =========== -->
    <main
        class="main-wrapper"
        :class="{ 'active' : !showSideBar }"
    >
        <!-- ========== header start ========== -->
        <app-header/>
        <!-- ========== header end ========== -->

        <!-- ========== section start ========== -->
        <section class="section">
            <div class="container-fluid">
                <!-- ========== title-wrapper start ========== -->
                <div class="title-wrapper pt-30">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="titlemb-30">
                                <h2>Title</h2>
                            </div>
                        </div>
                        <!-- end col -->
                        <div class="col-md-6">
                            <div class="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <a href="#0">Dashboard</a>
                                        </li>
                                        <li aria-current="page" class="breadcrumb-item active">
                                            Page
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <!-- end col -->
                    </div>
                    <!-- end row -->
                </div>
                <!-- ========== title-wrapper end ========== -->

              <router-view/>
            </div>
            <!-- end container -->
        </section>
        <!-- ========== section end ========== -->

        <!-- ========== footer start =========== -->
        <app-footer/>
        <!-- ========== footer end =========== -->
    </main>
    <!-- ======== main-wrapper end =========== -->
</template>
<script>
import AppFooter from './Partials/AppFooter';
import SideBar from './Partials/SideBar';
import AppHeader from './Partials/AppHeader';
import { defineComponent, reactive, computed, toRefs } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Admin',
    components: { AppHeader, SideBar, AppFooter },
    setup() {
        const store = useStore();
        const state = reactive({
            showSideBar : computed(()=> store.state.app.showSidebar)
        })
        return {
            ...toRefs(state)
        }
    },
})
</script>
