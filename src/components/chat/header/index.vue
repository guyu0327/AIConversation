<template>
  <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
    <template #operations>
      <t-switch v-model="slotChecked" @change="onChange" size="large">
        <template #label="slotProps">{{ slotProps.value ? '暗黑' : '明亮' }}</template>
      </t-switch>
    </template>
  </t-head-menu>
</template>

<script setup>
import {ref} from 'vue';

const menu1Value = ref('item2');
const slotChecked = ref(false);

const changeHandler = (active) => {
  console.log('change', active);
};

const onChange = (checked) => {
  if (checked) {
    document.documentElement.setAttribute("theme-mode", "dark");
  } else {
    document.documentElement.removeAttribute("theme-mode");
  }
};
</script>

<style lang="less" scoped>
.t-menu__operations {
  .t-button {
    margin-left: 8px;
  }
}

.t-demo-menu--dark {
  .t-button {
    color: #fff;

    &:hover {
      background-color: #4b4b4b;
      border-color: transparent;
      --ripple-color: #383838;
    }
  }
}
</style>
