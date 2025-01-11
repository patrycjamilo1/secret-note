<template>
    <div v-if="visible" class="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p class="text-black dark:text-white contrast:text-black">{{ message }}</p>
        <div class="mt-4 flex justify-center gap-2">
          <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded">
            No
          </button>
          <button @click="$emit('confirm')" class="px-4 py-2 bg-red-600 text-white rounded">
            Yes
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    visible: boolean;
    message: string;
  }>();
  </script>
  