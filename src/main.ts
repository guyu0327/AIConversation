import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import TDesign from 'tdesign-vue-next';
import TDesignChat from '@tdesign-vue-next/chat'; // 引入chat组件
import '@tdesign-vue-next/chat/es/style/index.css'; // 引入chat组件的少量全局样式变量

createApp(App).use(TDesign).use(TDesignChat).mount('#app')
