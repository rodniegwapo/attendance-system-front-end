<script setup>
import { useApi } from "@/composables/useApi.js";
import router from "@/router";
import { ref, reactive } from "vue";

const loading = ref(false)

const form = reactive({})

const handleLogin = async () => {
  try {
        const response = await useApi().post(
          "/login",
          form
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('isLoggedIn','true')
        router.push('/scanner')
        // redirect the user to the dashboard or the home page
      } catch (error) {
        console.log(error);
      }
}

</script>


<template>
  <section>
    <div>
      <section class="h-screen ">
        
        <div class=" h-full text-gray-800">
          
          <div
            class="flex relative xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
         
            <div
              class="xl:ml-20 xl:w-1/3 border relative p-8 rounded-lg lg:w-1/4 w-full mx-4 mb-12 md:mb-0 bg-gray-50 max-w-[450px]"
            >
            
            <span class="absolute top-2 left-2 text-sm text-blue-700 underline"><router-link to="/">Back</router-link></span>
          
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


