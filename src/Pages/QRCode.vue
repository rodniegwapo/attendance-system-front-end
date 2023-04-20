<script setup>
import { getStudentInfo } from "@/composables/studentInfo.js";
import { ref, onMounted } from "vue";

let studentInfo = ref(null)
const formatStudentInfo = () => {
  let item = getStudentInfo()
  localStorage.setItem('studentId',item.student.id)
  studentInfo.value = localStorage.getItem('studentId')
};

onMounted(() => {
  formatStudentInfo();
});
</script>

<template>
  <div>
    <div class="w-full h-screen justify-center items-center px-10">
      <vue-qrcode :value="studentInfo" :options="{ width: 300 }" style="position: absolute;top:20%"></vue-qrcode>
    </div>
  </div>
</template>
