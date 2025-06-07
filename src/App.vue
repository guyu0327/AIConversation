<script setup lang="ts">
import Index from '@/pages/index.vue'
// document.documentElement.setAttribute("theme-mode", "dark");
document.documentElement.removeAttribute("theme-mode");
</script>

<template>
  <Index/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
