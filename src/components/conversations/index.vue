<template>
  <t-menu theme="light" :expanded="['1']" default-value="1-1" :collapsed="collapsed" :expand-mutex="true" width=""
          @change="changeHandler">
    <template #logo>
      <span class="logo">{{ collapsed ? 'g' : 'guyu' }}</span>
    </template>
    <t-button v-show="!collapsed" block theme="default" variant="outline" size="large">
      <template #icon>
        <add-icon/>
      </template>
      <span>
        新建会话
      </span>
    </t-button>
    <t-submenu value="1">
      <template #icon>
        <t-icon name="time"/>
      </template>
      <template #title>
        <span>历史会话</span>
      </template>
      <t-menu-item value="1-1"> 新会话</t-menu-item>
      <t-menu-item value="1-2"> 新会话</t-menu-item>
      <t-menu-item value="1-3"> 新会话</t-menu-item>
    </t-submenu>
    <template #operations>
      <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
        <template #icon>
          <t-icon name="view-list"/>
        </template>
      </t-button>
    </template>
  </t-menu>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from 'vue';
import {MenuProps, ButtonProps} from 'tdesign-vue-next';
import {AddIcon} from 'tdesign-icons-vue-next';

const collapsed = ref(false);
const changeCollapsed: ButtonProps['onClick'] = () => {
  collapsed.value = !collapsed.value;
  nextTick(() => {
    const collapsed = document.querySelector('.t-is-collapsed');
    if (collapsed) {
      collapsed.style.width = '';
    }
    const fake_arrow = document.querySelector('.t-fake-arrow');
    if (fake_arrow) {
      console.log(fake_arrow)
      fake_arrow.style.cssText  = 'display: none';
    }
  })
};
const changeHandler: MenuProps['onChange'] = (active) => {
  console.log('change', active);
};

onMounted(() => {
  nextTick(() => {
    const menu__sub = document.querySelector('.t-menu__sub');
    if (menu__sub) {
      menu__sub.style.removeProperty('--padding-left');
    }
    const fake_arrow = document.querySelector('.t-fake-arrow');
    if (fake_arrow) {
      console.log(fake_arrow)
      fake_arrow.style.cssText  = 'display: none';
    }
  })
});
</script>
<style lang="less">
.logo {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
}

t-menu {
  width: 200px !important;
}

:deep(.t-fake-arrow) {
  display: none !important;
}

:deep(.t-submenu__item) {
  padding-left: 20px;
}
</style>
