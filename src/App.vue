<script setup lang="ts">
  import Header from './components/shared/Header.vue';
import YesNoModal from './components/shared/YesNoModal.vue';
</script>

<template>
  <Header />
  <router-view />
  <YesNoModal />
</template>

<style scoped></style>
