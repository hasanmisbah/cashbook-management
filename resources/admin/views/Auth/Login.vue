<template>
  <div class="row g-0 auth-row">
    <div class="col-lg-6">
      <div class="auth-cover-wrapper bg-primary-100">
        <div class="auth-cover">
          <div class="title text-center">
            <h1 class="text-primary mb-10">Welcome Back</h1>
            <p class="text-medium">
              Sign in to your Existing account to continue
            </p>
          </div>
          <div class="cover-image">
            <img alt="" src="../../assets/images/auth/signin-image.svg">
          </div>
          <div class="shape-image">
            <img alt="" src="../../assets/images/auth/shape.svg">
          </div>
        </div>
      </div>
    </div>
    <!-- end col -->
    <div class="col-lg-6">
      <div class="signin-wrapper">
        <div class="form-wrapper">
          <h6 class="mb-15">Sign In</h6>
          <p class="text-sm mb-25">
            Start creating the best possible user experience for you
            customers.
          </p>
          <div v-if="!!errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
          <form @submit.prevent="handleLogin">
            <div class="row">
              <div class="col-12">
                <input-comp
                  v-model="loginForm.email.value"
                  :error-message="loginForm.email.error"
                  label="Email"
                  place-holder="Email"
                  type="email"
                />
              </div>
              <!-- end col -->
              <div class="col-12">
                <input-comp
                  v-model="loginForm.password.value"
                  :error-message="loginForm.password.error"
                  label="Password"
                  place-holder="Password"
                  type="password"
                />
              </div>
              <!-- end col -->
              <div class="col-xxl-6 col-lg-12 col-md-6">
                <div class="form-check checkbox-style mb-30">
                  <input
                    id="checkbox-remember"
                    v-model="loginForm.remember_me.value"
                    :value="loginForm.remember_me.value" class="form-check-input"
                    type="checkbox"
                  >
                  <label class="form-check-label" for="checkbox-remember">
                    Remember me next time</label>
                </div>
              </div>
              <!-- end col -->
              <div class="col-xxl-6 col-lg-12 col-md-6">
                <div class="text-start text-md-end text-lg-start text-xxl-end mb-30 ">
                  <a href="#0">Forgot Password?</a>
                </div>
              </div>
              <!-- end col -->
              <div class="col-12">
                <div class=" button-group d-flex justify-content-center flex-wrap ">
                  <button-comp
                    :loading="formSubmitting"
                    class="w-100"
                    type="submit"
                  >
                    Sign In
                  </button-comp>
                </div>
              </div>
            </div>
            <!-- end row -->
          </form>
          <!--          <div class="singin-option pt-40">-->
          <!--            <p class="text-sm text-medium text-center text-gray">-->
          <!--              Easy Sign In With-->
          <!--            </p>-->
          <!--            <div class=" button-group pt-40 pb-40 d-flex justify-content-center flex-wrap ">-->
          <!--              <button class="main-btn primary-btn-outline m-2">-->
          <!--                <i class="lni lni-facebook-filled mr-10"></i>-->
          <!--                Facebook-->
          <!--              </button>-->
          <!--              <button class="main-btn danger-btn-outline m-2">-->
          <!--                <i class="lni lni-google mr-10"></i>-->
          <!--                Google-->
          <!--              </button>-->
          <!--            </div>-->
          <!--            <p class="text-sm text-medium text-dark text-center">-->
          <!--              Don’t have any account yet?-->
          <!--              <a href="#0">Create an account</a>-->
          <!--            </p>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <!-- end col -->
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputComp from "../../Components/Utils/inputComp";
import ButtonComp from "../../Components/Utils/ButtonComp";
import ErrorHelper from "../../utils/helper/ErrorHelper";
import routeMap from "../../utils/routeMap";

export default defineComponent({
  name: "Login",
  components: { ButtonComp, InputComp },
  setup() {
    const store = useStore();

    const router = useRouter()

    const state = reactive({

      loginForm: {

        email: {
          error: false,
          value: 'admin@gmail.com'
        },

        password: {
          error: false,
          value: '123456789'
        },

        remember_me: {
          error: false,
          value: ''
        },
      },

      errorMessage: '',

      formSubmitting: false,

    });

    const handleLogin = async () => {

      const data = {
        email: state.loginForm.email.value,
        password: state.loginForm.password.value,
        remember_me: !!state.loginForm.remember_me.value
      };

      state.formSubmitting = true;

      try {

        await store.dispatch('user/tryLogin', data);
        await store.dispatch('user/fetchAuthenticatedUser');

        await router.push({ name: routeMap.home.name });

      } catch (e) {
        state.errorMessage = e.message;
        ErrorHelper.mapServerError(e, (error, ex) => {
          state.loginForm.email.error = ex(error.email)
          state.loginForm.password.error = ex(error.password)
        })
      }

      state.formSubmitting = false;
    }
    return {
      ...toRefs(state),
      handleLogin
    }
  }
})
</script>

<style>
.auth-row {
  min-height: 100vh;
}
</style>
