import { createApp } from 'vue';

import App from './App.vue';
import '@/assets/less/index.less';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import mypinia from './myPinia';

import '@/api/mock.js';
import { useAllDataStore } from '@/store';

const app = createApp(App);
app.use(mypinia);

const store = useAllDataStore();
//调用方法，读取缓存store
store.addMenu(router, 'refresh');

app.use(router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
