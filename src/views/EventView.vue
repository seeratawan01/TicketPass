<script setup>
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import {CalendarIcon} from '@heroicons/vue/outline'
import {onMounted, reactive} from "vue";
import { useRoute } from 'vue-router'
import service from "../service";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const route = useRoute()

const data = reactive({
  event: {
    name: "",
    description: '',
    startDate: '',
    endDate: '',
    image: ''
  },
  loading: true,
});

onMounted(() => {
  const eventId = route.params.id
  fetchEvent(eventId);
})

/**
 * Fetches the event with the given id.
 */
const fetchEvent = async (eventId) => {
  data.loading = true
  try {
    const event = await service().get(`/events/${eventId}`)
    if (event.data) {
      data.event = {...event.data.data}
    }
  } catch (error) {

    Swal.fire({
      showConfirmButton: false,
      title: 'Error!',
      icon: 'error',
      text: error.message,
      toast: true,
      position: 'top-right',
      timer: 5000
    })
  }
  data.loading = false

}
</script>

<template>
  <ContainerWrapper class="pb-16 pt-8">

    <div v-if="!data.loading" >
      <img class="h-96 object-cover w-full rounded-tr rounded-tl" :src="data.event.image" :alt="data.event.name" />

      <div class="p-12 text-base-100 bg-neutral rounded-br rounded-bl">
              <div >
                <div >
                  <h1 class="mb-5 text-5xl font-bold">{{ data.event.name }}</h1>
                  <div class="flex space-x-1.5 justify-start items-center mb-5">
                    <CalendarIcon class="h-5 w-5 text-primary mr-1.5"/>
                    <span>{{ dayjs.unix(data.event.startDate).format('MMM DD YYYY h:mm A') }}</span>
                    <span> - </span>
                    <span>{{ dayjs.unix(data.event.endDate).format('MMM DD YYYY h:mm A') }}</span>
                  </div>
                  <p>
                    {{data.event.description}}
                  </p>
                </div>
              </div>
      </div>
    </div>
<!--{{data.event.image}}-->
<!--    <div v-if="!data.loading" class="hero h-96" style="background-image: url(https://api.lorem.space/image/fashion?w=1000&h=800);">-->
<!--      <div class="hero-overlay bg-opacity-50"></div>-->
<!--      <div class="hero-content text-center text-neutral-content">-->
<!--        <div class="max-w-md">-->
<!--          <h1 class="mb-5 text-5xl font-bold">Hello there</h1>-->
<!--          <div class="flex space-x-1.5 justify-center items-center mb-5">-->
<!--            <CalendarIcon class="h-5 w-5 text-primary mr-1.5"/>-->
<!--            <span>123-123-123 - </span><span class="text-gray-100">11:00</span>-->
<!--          </div> <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>-->
<!--          <button class="btn btn-primary text-white">Get Tickets</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </ContainerWrapper>
</template>
