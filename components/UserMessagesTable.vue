<template>
    <div class="overflow-x-auto max-w-full">
    <Collapse title="Filter Messages" icon="filter" class="!w-full mb-2 messages-collapse">
      <div class="flex flex-col gap-4">
        <div>
          <label for="validUntilAfter" class="block text-sm font-mediu">
            Valid Until After:
          </label>
          <div class="form-input-row">
            <input id="validUntilAfter" type="datetime-local" 
            v-model="localFilters.validUntilAfter" 
            @change="updateFilters" 
            class="form-input w-full" />
          </div>
        </div>
        <div>
          <label for="validUntilBefore" class="block text-sm font-medium">
            Valid Until Before:
          </label>
          <div class="form-input-row">
            <input id="validUntilBefore" type="datetime-local" 
            v-model="localFilters.validUntilBefore" 
            @change="updateFilters" 
            class="form-input w-full" />
          </div>
        </div>
      </div>
    </Collapse>

    <table class="min-w-full border-2 border-gray-500 dark:border-gray-600 contrast:border-black">
      <thead class="bg-gray-300 dark:bg-black contrast:bg-contrast-yellow border-b-2 border-gray-500 dark:border-gray-600 contrast:border-black">
        <tr class="divide-x divide-gray-500 dark:divide-gray-600 contrast:divide-black">
          <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black dark:text-white contrast:text-black uppercase tracking-wider">
            UUID
          </th>

          <th
            @click="onSort('validUntil')"
            @keydown.enter.space.prevent="onSort('validUntil')"
            role="button"
            tabindex="0"
            :aria-sort="ariaSort('validUntil')"
            scope="col"
            class="cursor-pointer px-6 py-3 text-left text-xs font-bold text-black dark:text-white contrast:text-black uppercase tracking-wider"
          >
            Valid Until
          </th>

          <th
            @click="onSort('createdAt')"
            @keydown.enter.space.prevent="onSort('createdAt')"
            role="button"
            tabindex="0"
            :aria-sort="ariaSort('createdAt')"
            scope="col"
            class="cursor-pointer px-6 py-3 text-left text-xs font-bold text-black dark:text-white contrast:text-black uppercase tracking-wider"
          >
            Created At
          </th>

          <th
            @click="onSort('updatedAt')"
            @keydown.enter.space.prevent="onSort('updatedAt')"
            role="button"
            tabindex="0"
            :aria-sort="ariaSort('updatedAt')"
            scope="col"
            class="cursor-pointer px-6 py-3 text-left text-xs font-bold text-black dark:text-white contrast:text-black uppercase tracking-wider"
          >
            Updated At
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300 dark:divide-gray-600">
        <tr
          v-for="message in messages"
          :key="message.uuid"
          class="divide-x divide-gray-300 dark:divide-gray-600 contrast:divide-black bg-white dark:bg-gray-900 contrast:bg-white"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-black dark:text-white contrast:text-black">
            {{ message.uuid }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 contrast:text-black">
            {{ message.validUntil ? dayjs(message.validUntil).format('YYYY-MM-DD HH:mm') : 'N/A' }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 contrast:text-black">
            {{ dayjs(message.createdAt).format('YYYY-MM-DD HH:mm') }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 contrast:text-black">
            {{ dayjs(message.updatedAt).format('YYYY-MM-DD HH:mm') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup lang="ts">
import dayjs from 'dayjs';
const props = defineProps<{
    messages: Array<{
    uuid: string;
    validUntil: string | null;
    createdAt: string;
    updatedAt: string;
    }>;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}>();

const localFilters = ref({
  validUntilAfter: '',
  validUntilBefore: '',
});
  
const emit = defineEmits<{
(e: 'sortChanged', sortBy: string, sortDirection: 'asc' | 'desc'): void;
(e: 'filtersChanged', filters: { validUntilAfter?: string; validUntilBefore?: string }): void;
}>();

function onSort(field: string) {
    let newDirection: 'asc' | 'desc' = 'asc';
    if (props.sortBy === field) {
        newDirection = props.sortDirection === 'asc' ? 'desc' : 'asc';
    }
    emit('sortChanged', field, newDirection);
}

function ariaSort(field: string): 'none' | 'ascending' | 'descending' {
  if (props.sortBy === field) {
    return props.sortDirection === 'asc' ? 'ascending' : 'descending';
  }
  return 'none';
}

function updateFilters() {
  emit('filtersChanged', {
    validUntilAfter: localFilters.value.validUntilAfter || undefined,
    validUntilBefore: localFilters.value.validUntilBefore || undefined,
  });
}
</script>
  