import { createApp } from 'vue';

import App from './App.vue';
import '@/assets/less/index.less';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/api/mock.js';
const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
