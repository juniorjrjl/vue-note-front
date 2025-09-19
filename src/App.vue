<script setup lang="ts">
  import Header from './components/shared/Header.vue';
  import InputModal from './components/shared/InputModal.vue';
  import YesNoModal from './components/shared/YesNoModal.vue';
</script>

<template>
  <Header />
  <router-view />
  <YesNoModal />
  <InputModal />
</template>

<style scoped></style>
