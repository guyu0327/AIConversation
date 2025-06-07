<template>
  <t-chat-sender
      ref="chatSenderRef"
      v-model="inputValue"
      class="chat-sender"
      :stop-disabled="props.stopDisabled"
      :textarea-props="{
      placeholder: '输入您的问题，帮您分析解答',
    }"
      @send="inputEnter"
      @stop="onStop"
  >
    <template #prefix>
      <div class="model-select">
        <t-tooltip v-model:visible="allowToolTip" content="切换模型" trigger="hover">
          <t-select
              v-model="selectValue"
              :options="selectOptions"
              value-type="object"
              @focus="allowToolTip = false"
          ></t-select>
        </t-tooltip>
        <t-button class="check-box" :class="{ 'is-active': props.isDeepThinking }" variant="text" @click="clickDeepThinking">
          <SystemSumIcon/>
          <span>深度思考</span>
        </t-button>
      </div>
    </template>
  </t-chat-sender>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {SystemSumIcon} from 'tdesign-icons-vue-next';

const props = defineProps({
  stopDisabled: {
    type: Boolean,
    default: false,
  },
  isDeepThinking: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["inputEnter", "onStop", "clickDeepThinking"]);
const allowToolTip = ref(false);
const chatSenderRef = ref(null);
const inputValue = ref('');
const selectOptions = [
  {
    label: 'Deepseek',
    value: 'deepseek-r1',
  }
];
const selectValue = ref({
  label: 'Deepseek',
  value: 'deepseek-r1',
});


const clickDeepThinking = () => {
  emits("clickDeepThinking")
};

const onStop = function () {
  emits("onStop")
};

const inputEnter = function () {
  emits("inputEnter", inputValue.value)
  inputValue.value = '';
};
</script>
<style lang="less">
.chat-sender {
  .btn {
    color: var(--td-text-color-disabled);
    border: none;

    &:hover {
      color: var(--td-brand-color-hover);
      border: none;
      background: none;
    }
  }

  .btn.t-button {
    height: var(--td-comp-size-m);
    padding: 0;
  }

  .model-select {
    display: flex;
    align-items: center;

    .t-select {
      width: 112px;
      height: var(--td-comp-size-m);
      margin-right: var(--td-comp-margin-s);

      .t-input {
        border-radius: 32px;
        padding: 0 15px;
      }

      .t-input.t-is-focused {
        box-shadow: none;
      }
    }

    .check-box {
      width: 112px;
      height: var(--td-comp-size-m);
      border-radius: 32px;
      border: 0;
      background: var(--td-bg-color-component);
      color: var(--td-text-color-primary);
      box-sizing: border-box;
      flex: 0 0 auto;

      .t-button__text {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          margin-left: var(--td-comp-margin-xs);
        }
      }
    }

    .check-box.is-active {
      border: 1px solid var(--td-brand-color-focus);
      background: var(--td-brand-color-light);
      color: var(--td-text-color-brand);
    }
  }
}
</style>
