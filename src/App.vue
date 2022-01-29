<script setup>
import AppContainer from "./components/AppContainer.vue"
import AppHeader from "./components/AppHeader.vue";
import AppMenu from "./components/AppMenu.vue"
import AppFooter from "./components/AppFooter.vue"
</script>

<template>
  <main class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex max-w-30"><AppMenu /></div>
      <div class="flex flex-1 flex-col">
        <div class="flex h-16 p-4"><AppHeader /></div>
        <div class="flex flex-1 overflow-y-auto paragraph px-4"><AppContainer /></div>
      </div>
    </div>
    <div class="flex"><AppFooter /></div>
  </main>
</template>
