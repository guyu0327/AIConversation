<template>
  <div class="chat-box">
    <ChatHeader style="width: 100%"/>
    <t-chat
        ref="chatRef"
        :clear-history="chatList.length > 0 && !isStreamLoad"
        :data="chatList"
        :text-loading="loading"
        :is-stream-load="isStreamLoad"
        @scroll="handleChatScroll"
        @clear="clearConfirm"
    >
      <!-- eslint-disable vue/no-unused-vars -->
      <template #content="{ item, index }">
        <t-chat-reasoning v-if="item.reasoning?.length > 0" expand-icon-placement="right">
          <template #header>
            <t-chat-loading v-if="isStreamLoad && item.content.length === 0" text="思考中..."/>
            <div v-else style="display: flex; align-items: center">
              <CheckCircleIcon style="color: var(--td-success-color-5); font-size: 20px; margin-right: 8px"/>
              <span>已深度思考</span>
            </div>
          </template>
          <t-chat-content v-if="item.reasoning.length > 0" :content="item.reasoning"/>
        </t-chat-reasoning>
        <t-chat-content v-if="item.content.length > 0" :content="item.content"/>
      </template>
      <template #actions="{ item, index }">
        <t-chat-action
            :content="item.content"
            :operation-btn="['good', 'bad', 'replay', 'copy']"
            @operation="handleOperation"
        />
      </template>
      <template #footer>
        <ChatSender :stop-disabled="isStreamLoad" :is-deep-thinking="isDeepThinking"
                    @input-enter="inputEnter" @on-stop="onStop" @click-deep-thinking="clickDeepThinking"/>
      </template>
    </t-chat>
    <t-button v-show="isShowToBottom" variant="text" class="bottomBtn" @click="backBottom">
      <div class="to-bottom">
        <ArrowDownIcon/>
      </div>
    </t-button>
  </div>
</template>
<script setup lang="jsx">
import {ref, watch} from 'vue';
import {ArrowDownIcon, CheckCircleIcon} from 'tdesign-icons-vue-next';
import ChatHeader from "./header/index.vue"
import ChatSender from "./sender/index.vue"
import {useReadStream} from "@/utils/stream/useReadStream.js"
import {chatMessages, chatMessagesStop} from "@/api/index.js";
import moment from "moment";

const apiKey = ref("app-HCwOXl4nWGhZuuwihY2qEawp")
const isDeepThinking = ref(false);
const taskId = ref("")
const userId = ref("abc-123")
const conversationId = ref("")
let controller = new AbortController();
const {handleStreamResponse} = useReadStream();
const loading = ref(false);
// 流式数据加载中
const isStreamLoad = ref(false);

const chatRef = ref(null);
const isShowToBottom = ref(false);
// 滚动到底部
const backBottom = () => {
  chatRef.value.scrollToBottom({
    behavior: 'smooth',
  });
};
// 是否显示回到底部按钮
const handleChatScroll = function ({e}) {
  const scrollTop = e.target.scrollTop;
  isShowToBottom.value = scrollTop < 0;
};
// 清空消息
const clearConfirm = function () {
  chatList.value = [];
};
const handleOperation = function (type, options) {
  console.log('handleOperation', type, options);
  if (type === "good ") {
  }
  if (type === "bad") {
  }
  if (type === "replay") {
  }
};
// 倒序渲染
const chatList = ref([]);

const clickDeepThinking = () => {
  isDeepThinking.value = !isDeepThinking.value;
  conversationId.value = ""

}

const onStop = function () {
  if (taskId.value) {
    chatMessagesStop({user: userId.value}, taskId.value, apiKey.value).then(res => {
      console.log(res, 'res')
    })
    loading.value = false;
    isStreamLoad.value = false;
  }
};

const inputEnter = function (inputValue) {
  if (isStreamLoad.value) {
    return;
  }
  if (!inputValue) return;
  const params = {
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    name: '自己',
    datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    content: inputValue,
    role: 'user',
  };
  chatList.value.unshift(params);
  // 空消息占位
  const params2 = {
    avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
    name: 'AI',
    datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    content: '',
    reasoning: '',
    role: 'assistant',
  };
  chatList.value.unshift(params2);
  handleData(inputValue);
};

const handleData = async (val) => {
  loading.value = true;
  const lastItem = chatList.value[0];
  let response = "";
  response = await chatMessages(controller.signal, {
    "inputs": {},
    "query": val,
    "response_mode": "streaming",
    "conversation_id": conversationId.value,
    "user": userId.value,
    "files": []
  }, apiKey.value);
  await handleStreamResponse(response, (jsonData) => {
    console.log(jsonData, "jsonData");
    if (jsonData.event === "message") {
      if (loading.value) {
        loading.value = false;
      }
      lastItem.content += jsonData.answer;
      lastItem.content = lastItem.content.replace('#f8f8f8', 'var(--td-bg-color-secondarycontainer)');

    }
    if (jsonData.event === "message_end") {
      isStreamLoad.value = false;
    }
    if (jsonData.conversation_id) {
      conversationId.value = jsonData.conversation_id;
    }
    if (jsonData.task_id && jsonData.event !== "message_end") {
      taskId.value = jsonData.task_id;
      isStreamLoad.value = true;
    }
  })
};
watch(
  () => isDeepThinking.value,
  () => {
    if (isDeepThinking.value) {
      apiKey.value = "app-QP4DpTw3pdNV179hOlw2epCF"
    } else {
      apiKey.value = "app-HCwOXl4nWGhZuuwihY2qEawp"
    }
  }
);
</script>
<style lang="less">
/* 应用滚动条样式 */
::-webkit-scrollbar-thumb {
  background-color: var(--td-scrollbar-color);
}

::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: var(--td-scrollbar-hover-color);
}

::-webkit-scrollbar-track {
  background-color: var(--td-scroll-track-color);
}

.chat-box {
  position: relative;
  width: 100%;
  height: 94%;
  background-color: var(--main-bg-color);

  .t-chat {
    padding: 20px 80px 80px 80px;
  }

  .bottomBtn {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: 210px;
    padding: 0;
    border: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.08), 0px 16px 24px 2px rgba(0, 0, 0, 0.04),
    0px 6px 30px 5px rgba(0, 0, 0, 0.05);
  }

  .to-bottom {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    background: var(--td-bg-color-container);
    border-radius: 50%;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .t-icon {
      font-size: 24px;
    }
  }
}

.model-select {
  display: flex;
  align-items: center;

  .t-select {
    width: 112px;
    height: 32px;
    margin-right: 8px;

    .t-input {
      border-radius: 32px;
      padding: 0 15px;
    }
  }

  .check-box {
    width: 112px;
    height: 32px;
    border-radius: 32px;
    border: 0;
    background: #e7e7e7;
    color: rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
    flex: 0 0 auto;

    .t-button__text {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 4px;
      }
    }
  }

  .check-box.is-active {
    border: 1px solid #d9e1ff;
    background: #f2f3ff;
    color: var(--td-brand-color);
  }
}
</style>
