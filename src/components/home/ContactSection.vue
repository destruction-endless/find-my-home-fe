<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
import { Send, CheckCircle } from "lucide-vue-next";

const submitted = ref(false);

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-() ]+$/, "Enter a valid phone number"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: phone, errorMessage: phoneError } = useField<string>("phone");
const { value: message, errorMessage: messageError } =
  useField<string>("message");

const onSubmit = handleSubmit(() => {
  // Mock submission — no backend yet
  submitted.value = true;
  resetForm();
  setTimeout(() => {
    submitted.value = false;
  }, 5000);
});
</script>

<template>
  <section id="contact" class="py-16 md:py-24 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Info -->
        <div>
          <p
            class="text-accent font-semibold text-sm uppercase tracking-wider mb-2"
          >
            Get in Touch
          </p>
          <h2
            class="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          >
            Ready to Find Your Home?
          </h2>
          <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Whether you're looking to buy, sell, or need help with title
            transfers and documentation, we're here to help. Fill out the form
            and we'll get back to you as soon as possible.
          </p>
          <div class="mt-8 space-y-4">
            <div
              class="flex items-center gap-3 text-gray-600 dark:text-gray-400"
            >
              <div
                class="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-lg flex items-center justify-center shrink-0"
              >
                <Send :size="18" class="text-accent" />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white text-sm">
                  Quick Response
                </p>
                <p class="text-sm">We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div>
          <!-- Success Message -->
          <div
            v-if="submitted"
            class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center"
          >
            <CheckCircle
              :size="48"
              class="text-green-600 dark:text-green-400 mx-auto mb-3"
            />
            <h3
              class="font-heading text-lg font-semibold text-green-800 dark:text-green-300"
            >
              Message Sent!
            </h3>
            <p class="text-sm text-green-700 dark:text-green-400 mt-1">
              Thank you for reaching out. We'll get back to you soon.
            </p>
          </div>

          <form v-else @submit="onSubmit" novalidate class="space-y-5">
            <!-- Name -->
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                autocomplete="name"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-sm"
                placeholder="Juan Dela Cruz"
              />
              <p
                v-if="nameError"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ nameError }}
              </p>
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-sm"
                placeholder="juan@email.com"
              />
              <p
                v-if="emailError"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ emailError }}
              </p>
            </div>

            <!-- Phone -->
            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-sm"
                placeholder="+63 917 123 4567"
              />
              <p
                v-if="phoneError"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ phoneError }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                v-model="message"
                rows="4"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-sm resize-y"
                placeholder="I'm interested in a property..."
              ></textarea>
              <p
                v-if="messageError"
                class="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {{ messageError }}
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              <Send :size="18" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
