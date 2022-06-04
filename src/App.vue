<script setup>
import { RouterView } from "vue-router";
import Navbar from '@/components/Navbar.vue'

</script>

<template>
  <Navbar v-if="$route.name !== 'login'"/>
  <main class="py-16">
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";

</style>
