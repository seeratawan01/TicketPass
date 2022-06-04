<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/NavigationBar.vue";
</script>

<template>
  <!-- Navbar Component (not visible on login route) -->
  <Navbar v-if="$route.name !== 'login'" />

  <!-- Website content will render here -->
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";
</style>
