<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores";
import Swal from "sweetalert2";

const onSubmit = (values) => {
  const authStore = useAuthStore();
  const { email, password } = values;
  return authStore.login(email, password).catch((error) => {
    Swal.fire({
      showConfirmButton: false,
      title: "Error!",
      icon: "error",
      text: error.response.data.message,
      toast: true,
      position: "top-right",
      timer: 5000,
    });
  });
};

/**
 * Email Field Validation Rule
 */
const validateEmail = (value) => {
  if (!value) {
    return "This field is required";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }
  return true;
};

/**
 * Password Field Validation Rule
 */
const validatePassword = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
<template>
  <section class="h-screen">
    <div class="px-6 py-12 h-full">
      <div class="flex justify-center items-center h-full g-6 text-gray-800">
        <div class="w-full md:w-8/12 lg:w-5/12 p-16 border">
          <Form @submit="onSubmit">
            <!-- Email input -->

            <div class="text-4xl font-bold text-center mb-8">
              <RouterLink to="/" custom v-slot="{ navigate }">
                <a @click="navigate" @keypress.enter="navigate" role="link" class="cursor-pointer">
                  Ticket<span class="text-primary">Pass</span>
                </a>
              </RouterLink>
            </div>

            <div class="form-control w-full">
              <Field
                name="email"
                :rules="validateEmail"
                type="email"
                class="input input-bordered w-full"
                placeholder="Email Address"
              />

              <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="email" />
                </span>
              </label>
            </div>

            <div class="form-control w-full mt-1">
              <Field
                name="password"
                :rules="validatePassword"
                type="password"
                class="input input-bordered w-full"
                placeholder="Password"
              />

              <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="password" />
                </span>
              </label>
            </div>

            <div class="form-control w-full mt-5">
              <button type="submit" class="btn btn-primary text-white">
                Log In
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
