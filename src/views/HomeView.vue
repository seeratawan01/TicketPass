<script setup>
import EventCard from '@/components/EventCard.vue'
import ContainerWrapper from '@/components/ContainerWrapper.vue'

const handleClick = () => {
  console.log('Clicked')
}

</script>

<template>
  <ContainerWrapper>
    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      <EventCard
          v-for="i in 8"
          :key="i"
          cover="https://api.lorem.space/image/shoes?w=400&h=225"
          title="Above Below 2022"
          date="Jun 02, 2022"
          time="11:00"
          @view-click="handleClick" />
    </div>
    <div class="mt-12 flex justify-end">
      <div class="btn-group">
        <button class="btn">«</button>
        <button class="btn">Page 1</button>
        <button class="btn">»</button>
      </div>
    </div>
  </ContainerWrapper>
</template>
