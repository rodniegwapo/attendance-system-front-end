<script setup>
import { ref, onMounted, reactive } from "vue";
import { useApi } from "@/composables/useApi.js";
import { setStudentInfo } from "@/composables/studentInfo.js";

import router from "@/router";

const yearLevels = ref([]);
const student = ref(null);
const loading = ref(false);
const errors = ref(null);
let form = reactive({});
const getYearLevels = async () => {
  let item = await useApi().get("/yearLevels");
  yearLevels.value = item.data;
};

const generate = async () => {
  try {
    loading.value = true;
    let item = await useApi().post("/generateQRCode", form);
    student.value = item.data;
    setStudentInfo(student.value);
    router.push("/qr-code");
    // form = {}
  } catch ({ response }) {
    errors.value = response.data?.errors;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getYearLevels();
});
</script>

<template>
  <div>
    <div class="flex w-full justify-center px-10">
      <div
        class="w-full relative shadow xs:w-full mt-8 px-4 pb-8 rounded bg-gray-50"
      >
        <span class="absolute top-2 left-2 text-sm underline"
          ><router-link to="/" class="!text-blue-700">Back</router-link></span
        >
        <div class="text-center text-2xl mt-8">Get QR Code</div>
        <div class="w-full mt-4">
          <div><label for="">First Name</label></div>
          <div>
            <input
              type="text"
              class="w-full p-2 border rounded"
              placeholder="First Name"
              v-model="form.first_name"
            />
          </div>
          <div class="errors" v-if="errors && errors['first_name']">
            {{ errors["first_name"][0] }}
          </div>
        </div>
        <div class="w-full mt-2">
          <div><label for="">Middle Name</label></div>
          <div>
            <input
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Middle Name"
              v-model="form.middle_name"
            />
          </div>
        </div>
        <div class="w-full mt-2">
          <div><label for="">Last Name</label></div>
          <div>
            <input
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Last Name"
              v-model="form.last_name"
            />
          </div>
          <div class="errors" v-if="errors && errors['last_name']">
            {{ errors["last_name"][0] }}
          </div>
        </div>
        <div class="w-full mt-2">
          <div><label for="">Suffix</label></div>
          <div>
            <input
              type="text"
              class="w-full p-2 border rounded"
              placeholder="Suffix"
              v-model="form.suffix"
            />
          </div>
        </div>

        <div class="w-full mt-2">
          <div><label for="">Year Levels</label></div>
          <div>
            <select
              v-model="form.year_level_id"
              class="w-full border rounded p-2"
            >
              <option
                v-for="option in yearLevels"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="errors" v-if="errors && errors['year_level_id']">
            {{ errors["year_level_id"][0] }}
          </div>
        </div>

        <div class="flex w-full gap-2 mt-8">
          <button
            class="w-full bg-green-700 p-2 text-white rounded"
            @click="generate"
          >
            <span v-if="loading">Loading...</span>
            <span v-else> Generate</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.errors {
  font-size: 12px;
  color: red;
}
</style>
