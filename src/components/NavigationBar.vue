<script setup>
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
</script>

<template>
  <header class="navbar bg-base-100 border-b py-3.5">
    <div class="flex-1">
      <RouterLink to="/" custom v-slot="{ navigate }">
        <a
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
          class="btn btn-ghost normal-case font-bold text-2xl"
          >Ticket<span class="text-primary">Pass</span></a
        >
      </RouterLink>
    </div>
    <nav class="flex-none">
      <div class="dropdown dropdown-end sm:hidden pr-4">
        <label tabindex="0" class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <RouterLink to="/event/new" custom v-slot="{ navigate }">
              <button
                @click="navigate"
                @keypress.enter="navigate"
                role="link"
                class="btn btn-primary rounded-full text-white px-12"
              >
                Create Event
              </button>
            </RouterLink>
          </li>

          <li class="mt-2.5">
            <button
              v-if="authStore.access_token"
              @click="() => authStore.logout()"
              role="link"
              class="btn btn-outline px-12"
            >
              Log out
            </button>
            <RouterLink v-else to="/login" custom v-slot="{ navigate }">
              <button
                @click="navigate"
                @keypress.enter="navigate"
                role="link"
                class="btn btn-outline px-12"
              >
                Login
              </button>
            </RouterLink>
          </li>
        </ul>
      </div>

      <ul class="hidden sm:flex menu menu-horizontal p-0 pr-4">
        <li>
          <RouterLink to="/event/new" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              @keypress.enter="navigate"
              role="link"
              class="btn btn-primary rounded-full text-white px-12"
            >
              Create Event
            </button>
          </RouterLink>
        </li>

        <li class="ml-2.5">
          <button
            v-if="authStore.access_token"
            @click="() => authStore.logout()"
            role="link"
            class="btn btn-outline px-12"
          >
            Log out
          </button>

          <RouterLink v-else to="/login" custom v-slot="{ navigate }">
            <button
              @click="navigate"
              @keypress.enter="navigate"
              role="link"
              class="btn btn-outline px-12"
            >
              Login
            </button>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped></style>
