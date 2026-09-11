<script setup>
import MainSidebar from './components/MainSidebar.vue'
</script>

<template>
  <NuxtLayout>
    <div class="flex justify-between">
      <MainSidebar />
      <div class="w-full">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>
