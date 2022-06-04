<script setup>
import { RouterView } from "vue-router";
import Navbar from '@/components/Navbar.vue'

</script>

<template>
  <Navbar/>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";

</style>
