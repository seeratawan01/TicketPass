<script setup>
import EventCard from "@/components/EventCard.vue";
import EventCardLoader from "@/components/EventCardLoader.vue";
import ContainerWrapper from "@/components/ContainerWrapper.vue";
import router from "../router";
import { onMounted, reactive } from "vue";
import Swal from "sweetalert2";
import service from "../service";
import { CommonSwalOptions } from "../CONSTANTS";

const data = reactive({
  events: [],
  loading: true,
  pagination: {
    currentPage: 1,
    nextLink: null,
    prevLink: null,
  },
});

/**
 * Navigate to page with event details.
 */
const handleClick = (id) => {
  router.push({ name: "view-event", params: { id: id } });
};

/**
 * Loads the events from the API
 */
const fetchEvents = async (page = 1) => {
  data.loading = true;
  try {
    let responseData = await service().get(`/events?page=${page}`);

    if (responseData.data) {
      if (responseData.data.data) {
        data.events = responseData.data.data;
      }

      if (responseData.data.links) {
        data.pagination.nextLink = responseData.data.links.next;
        data.pagination.prevLink = responseData.data.links.prev;
      }

      if (responseData.data.meta) {
        data.pagination.currentPage = responseData.data.meta.current_page;
      }
    }
  } catch (error) {
    Swal.fire({
      ...CommonSwalOptions,
      title: "Error!",
      icon: "error",
      text: error.message,
    });
  }

  data.loading = false;
};

onMounted(async () => {
  await fetchEvents(1);
});
</script>

<template>
  <ContainerWrapper class="py-12">
    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
      <template v-if="data.loading">
        <EventCardLoader v-for="i in 8" :key="i" />
      </template>
      <template v-else>
        <EventCard
          v-for="event in data.events"
          :key="event.id"
          :cover="event.image"
          :title="event.name"
          :startDate="event.startDate"
          :endDate="event.endDate"
          @view-click="() => handleClick(event.id)"
        />
      </template>
    </div>
    <div v-if="!data.loading" class="mt-12 flex justify-end">
      <div class="btn-group">
        <button
          :disabled="!data.pagination.prevLink"
          @click="() => fetchEvents(data.pagination.currentPage - 1)"
          class="btn btn-outline"
        >
          «
        </button>
        <button class="btn btn-outline">
          Page {{ data.pagination.currentPage }}
        </button>
        <button
          :disabled="!data.pagination.nextLink"
          @click="() => fetchEvents(data.pagination.currentPage + 1)"
          class="btn btn-outline"
        >
          »
        </button>
      </div>
    </div>
  </ContainerWrapper>
</template>
