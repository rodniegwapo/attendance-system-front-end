<template>
  <section>
    <div>
      <section class="h-screen bg-gray-100">
        <div class="px-6 h-full text-gray-800">
          <div
            class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              class="xl:ml-20 xl:w-1/3 border p-8 rounded-lg lg:w-1/4 md:w-8/12 mb-12 md:mb-0 bg-white max-w-[450px]"
            >
              <div class="py-4 text-red-600 text-xs" v-if="errors">
                *{{ errors }}
              </div>
              <div class="pb-6">
                <div class="text-center text-2xl">Welcome Back</div>
                <div class="text-center text-xs">
                  Enter your credentials to access your account.
                </div>
              </div>
              <form>
                <!-- Email input -->
                <div class="mb-6">
                  <div><label for="">Username</label></div>
                  <input
                    type="text"
                    v-model="form.email"
                    class="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <!-- Password input -->
                <div class="mb-6">
                  <div><label for="">Password</label></div>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                  />
                </div>

                <div class="flex justify-between items-center mb-6">
                  <div class="form-group form-check">
                    <input
                      type="checkbox"
                      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      class="form-check-label inline-block text-gray-800"
                      for="exampleCheck2"
                      >Remember me</label
                    >
                  </div>
                  <a href="#!" class="text-gray-800">Forgot password?</a>
                </div>

                <div class="text-center lg:text-left">
                  <button
                    type="button"
                    class="inline-block px-7 py-2 bg-blue-700 text-white text-sm leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    @click="handleLogin"
                  >
                    <span v-if="loading"> Loading...</span>
                    <span v-else> Login</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {},
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          this.form
        );
        localStorage.setItem("token", response.data.token);
        // redirect the user to the dashboard or the home page
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
