import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import "./index.css";
import router from "./router";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.component(VueQrcode.name, VueQrcode);
app.config.globalProperties.$axios = axios;
app.use(router).use(Antd);

app.mount("#app");
