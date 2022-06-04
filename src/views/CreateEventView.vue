<script setup>
import ContainerWrapper from '@/components/ContainerWrapper.vue'
import {Form, Field, ErrorMessage} from "vee-validate";
import {ref} from "vue";
import service from "../service";
import Swal from "sweetalert2";
import router from "../router";
const previewSrc = ref('')
import {CommonSwalOptions} from "../CONSTANTS";
const toTimestamp = (strDate) => {
  let datum = Date.parse(strDate);
  return datum / 1000;
}

const onSubmit = async (values, { setErrors }) => {
  const {name, description, startDate, endDate, image} = values

  try {
    let resp = await service({requiresAuth: true}).post('/events', {
      name,
      description,
      image: image[0],
      startDate: toTimestamp(startDate),
      endDate: toTimestamp(endDate)
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (resp.data) {

      // if error occurs
      if (resp.data.errors) {
        console.log('errors', resp.data.errors)
        console.log('errors', setErrors)
        setErrors(resp.data.errors)
        await Swal.fire({
          ...CommonSwalOptions,
          title: 'Error!',
          icon: 'error',
          text: 'Something went wrong!',
        })

        return;
      }

      // if event created successfully
      Swal.fire({
        ...CommonSwalOptions,
        title: 'Success',
        text: 'Event created successfully',
        icon: 'success',
      })

      router.push('/')
    }

  } catch (error) {
    await Swal.fire({
      ...CommonSwalOptions,
      title: 'Error!',
      icon: 'error',
      text: error.message,
    })
  }


};


const showPreview = (event) => {
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    previewSrc.value = src;
  }
}

/**
 * Text Field Validation Rule
 */
const validateText = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
<template>
  <ContainerWrapper class="py-12">
    <div class="flex justify-center ">
      <Form @submit="onSubmit" class="w-full md:w-5/12">

        <div class="form-control w-full">
          <label class="label font-bold">
                <span class="label-text">
                  Event Name
                </span>
          </label>

          <Field
              name="name"
              :rules="validateText"
              accept="image/*"
              type="text"
              class="input input-bordered w-full"
              placeholder="Enter your event name"
          />

          <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="name"/>
                </span>
          </label>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-control w-full">
            <label class="label font-bold">
                <span class="label-text">
                  Start Date
                </span>
            </label>

            <Field
                name="startDate"
                :rules="validateText"
                type="date"
                class="input input-bordered w-full"
                placeholder="Select state date"
            />

            <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="startDate"/>
                </span>
            </label>
          </div>

          <div class="form-control w-full">
            <label class="label font-bold">
                <span class="label-text">
                  End Date
                </span>
            </label>

            <Field
                name="endDate"
                :rules="validateText"
                type="date"
                class="input input-bordered w-full"
                placeholder="Select state date"
            />

            <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="endDate"/>
                </span>
            </label>
          </div>
        </div>

        <div class="form-control w-full">
          <label class="label font-bold">
                <span class="label-text">
                  Event Description
                </span>
          </label>

          <Field
              as="textarea"
              name="description"
              :rules="validateText"
              class="textarea textarea-bordered w-full"
              placeholder="Enter your event description"
          />

          <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="description"/>
                </span>
          </label>
        </div>

        <div class="form-control w-full">
          <label class="label font-bold">
                <span class="label-text">
                  Event Image
                </span>
          </label>

          <div class=" form-control w-full">
            <div class=" rounded-lg overflow-hidden md:max-w-xl">
              <div class="md:flex">
                <div class="w-full p-3">
                  <div
                      :style="`background-image: url(${previewSrc})`"
                      class="relative border-dotted h-48 rounded-xl border-dashed border-2 border-primary bg-gray-100 bg-cover flex justify-center items-center">

                    <div class="absolute" v-if="previewSrc.length === 0">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                        <span class="block text-gray-400 font-normal">Attach you file here</span>
                      </div>
                    </div>

                    <Field
                        :rules="validateText"
                        name="image"
                        type="file"
                        accept="image/*"
                        class="h-full w-full opacity-0"
                        @change="showPreview"
                    />

                  </div>
                </div>
              </div>
            </div>

            <label class="label">
                <span class="label-text-alt text-red-500">
                  <ErrorMessage name="image"/>
                </span>
            </label>
          </div>

          <div class="form-control w-full mt-5">
            <button type="submit" class="btn btn-primary text-white">
              Create Event
            </button>
          </div>


        </div>

      </Form>
    </div>
  </ContainerWrapper>
</template>

<style></style>
