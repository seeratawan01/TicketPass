<script setup>
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import {CalendarIcon} from '@heroicons/vue/outline'
</script>

<template>
  <ContainerWrapper class="pb-16 pt-8">
    <div class="hero h-96" style="background-image: url(https://api.lorem.space/image/fashion?w=1000&h=800);">
      <div class="hero-overlay bg-opacity-50"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
          <div class="flex space-x-1.5 justify-center items-center mb-5">
            <CalendarIcon class="h-5 w-5 text-primary mr-1.5"/>
            <span>123-123-123 - </span><span class="text-gray-100">11:00</span>
          </div> <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button class="btn btn-primary text-white">Get Tickets</button>
        </div>
      </div>
    </div>

  </ContainerWrapper>
</template>
