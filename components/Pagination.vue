<template>
    <div class="flex items-center justify-center mt-4 space-x-4">
      <button 
        @click="previousPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 bg-main-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
  
      <span class="text-sm text-gray-700 dark:text-gray-300 contrast:text-black">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
  
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 bg-main-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    currentPage: number;
    totalPages: number;
  }>();
  
  const emit = defineEmits<{
    (e: 'pageChanged', newPage: number): void;
  }>();
  
  function previousPage() {
    if (props.currentPage > 1) {
      emit('pageChanged', props.currentPage - 1);
    }
  }
  
  function nextPage() {
    if (props.currentPage < props.totalPages) {
      emit('pageChanged', props.currentPage + 1);
    }
  }
  </script>
  