<script setup>

import { CalendarIcon } from '@heroicons/vue/outline'
import dayjs from 'dayjs'
const props = defineProps({
  cover: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: [String, Number],
    required: true
  },
})


</script>

<template>
  <div class="card card-compact bg-base-100 shadow-xl">
    <figure class="sm:h-48 md:h-36 lg:h-40">
      <img class="object-cover h-full w-full" :src="props.cover" :alt="props.title" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{props.title}}</h2>
      <div class="flex space-x-1.5">
       <CalendarIcon class="h-5 w-5 text-primary mr-1.5"/>
        <span>
          {{dayjs.unix(props.startDate).format('MMM DD YYYY - h:mm A')}}
        </span>
      </div>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary btn-sm text-white px-8" @click='$emit("view-click")'>View</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
