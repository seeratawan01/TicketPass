<script setup>
import ContainerWrapper from "@/components/ContainerWrapper.vue";
import { CalendarIcon } from "@heroicons/vue/outline";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import service from "../service";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import EventCardLoader from "@/components/EventCardLoader.vue";
import { CommonSwalOptions } from "../CONSTANTS";
import router from "../router";

const route = useRoute();

const data = reactive({
  event: {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    image: "",
  },
  loading: true,
});

onMounted(() => {
  const eventId = route.params.id;
  fetchEvent(eventId);
});

/**
 * Fetches the event with the given id.
 */
const fetchEvent = async (eventId) => {
  data.loading = true;
  try {
    const event = await service().get(`/events/${eventId}`);
    if (event.data) {
      data.event = { ...event.data.data };
    }
  } catch (error) {
    Swal.fire({
      ...CommonSwalOptions,
      title: "Error!",
      icon: "error",
      text: error.message,
    });

    router.push("/");
  } finally {
    data.loading = false;
  }
};
</script>

<template>
  <ContainerWrapper class="pb-16 pt-8">
    <div v-if="!data.loading">
      <img
        class="h-96 object-cover w-full rounded-tr rounded-tl"
        :src="data.event.image"
        :alt="data.event.name"
      />

      <div class="p-12 text-base-100 bg-neutral rounded-br rounded-bl">
        <div>
          <div>
            <h1 class="mb-5 text-5xl font-bold">{{ data.event.name }}</h1>
            <div class="flex space-x-1.5 justify-start items-center mb-5">
              <CalendarIcon class="h-5 w-5 text-primary mr-1.5" />
              <span>{{
                dayjs.unix(data.event.startDate).format("MMM DD YYYY h:mm A")
              }}</span>
              <span> - </span>
              <span>{{
                dayjs.unix(data.event.endDate).format("MMM DD YYYY h:mm A")
              }}</span>
            </div>
            <p>
              {{ data.event.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <EventCardLoader variant="page" />
    </div>
  </ContainerWrapper>
</template>
