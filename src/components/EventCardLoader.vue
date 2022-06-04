<script setup>
let props = defineProps({
  variant: {
    type: String,
    default: "default",
  },
});
</script>

<template>
  <div class="card card-compact bg-base-100 shadow-xl animate-pulse">
    <div
      :class="`bg-slate-300 w-full ${
        props.variant === 'default' ? 'h-44' : 'h-96'
      }`"
    ></div>
    <div class="card-body">
      <div class="h-6 bg-slate-300 rounded"></div>
      <div class="mt-1">
        <div class="h-4 bg-slate-300 rounded"></div>
      </div>
      <div class="card-actions justify-end mt-4">
        <div class="h-8 w-24 bg-slate-300 rounded"></div>
      </div>
    </div>
  </div>
</template>
