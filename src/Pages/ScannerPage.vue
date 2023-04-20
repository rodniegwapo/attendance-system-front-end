<script setup>
import { useApi } from "@/composables/useApi.js";
import { ref, onMounted, reactive } from "vue";

const events = ref([]);
const currentEvent = ref(null);
const loading = ref(false);
let form = reactive({});

const getEvents = async () => {
  let item = await useApi().get("/events");
  let user = await useApi().get("/user");
  console.log('user',user)
  events.value = item.data;
};

onMounted(() => {
  getEvents();
});

const onDecode = async (id) => {
  try {
    loading.value = true;
    form.student_id = Number(id);
    form.event_id = currentEvent;
    await useApi().post("/setTimeIn", form);
  } catch (error) {
    alert("Error while scanning please try again.");
  } finally {
    loading.value = false;
  }
  // alert(`this is sample value ${text} , the event ${currentEvent.value}`);
  // console.log(`Decode text from QR code is ${text}`);
};
const onLoaded = () => {
  console.log(`Ready to start scanning barcodes`);
};

const logout = async () => {
  await useApi().post('/logout')
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('token');
  router.push('/')

}
</script>
<template>
  <div>
    <div class="text-2xl p-4">Scan QR Code</div>
    <div class="flex w-full gap-4 flex-col items-center h-screen">
      <div class="px-4 w-full">
        <div><label for="">Select Events</label></div>
        <select v-model="currentEvent" class="w-full border rounded p-2">
          <option v-for="option in events" :key="option.id" :value="option.id">
            {{ option.name }}
          </option>
        </select>
      </div>
      <div v-if="loading">Scanning...</div>
      <div class="px-4" v-else>
        <StreamBarcodeReader
          @decode="onDecode"
          @loaded="onLoaded"
        ></StreamBarcodeReader>
      </div>

      <div class="absolute bottom-0 w-full"><button class="w-full p-2  bg-green-700 text-white" @click="logout">Logout</button></div>
    </div>
  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import router from '@/router';

export default {
  components: {
    StreamBarcodeReader,
  },
};
</script>
