<template>
    <section class="secret-form-section flex flex-col gap-6">
        <h1>Messages created by you</h1>
        <UserMessagesTable
          :messages="messages"
          :sortBy="query.sortBy"
          :sortDirection="query.sortDirection"
          @sortChanged="handleSortChanged"
          @filters-changed="handleFiltersChanged"
        />
        <Pagination 
          v-if="messagesData?.totalPages"
          :currentPage="query.page ?? 1" 
          :totalPages="messagesData?.totalPages" 
          @pageChanged="handlePageChanged" 
    />
      </section>
</template>


<script setup lang="ts">
import { useUserMessages } from '~/composables/useUserMessages';
import type { GetUserMessagesDto } from '~/types/api';

const query = ref<GetUserMessagesDto>({
  page: 1,
  pageSize: 2,
  sortBy: 'createdAt',
  sortDirection: 'desc',
});

function handleSortChanged(newSortBy: string, newSortDirection: 'asc' | 'desc') {
  query.value.sortBy = newSortBy as GetUserMessagesDto['sortBy'];
  query.value.sortDirection = newSortDirection;
  refresh();
}

function handleFiltersChanged(filters: { validUntilAfter?: string; validUntilBefore?: string }) {
  query.value.validUntilAfter = filters.validUntilAfter;
  query.value.validUntilBefore = filters.validUntilBefore;
  refresh();
}

const { data: messagesData, refresh } = useUserMessages(query.value);

const messages = computed(() => messagesData.value?.items ?? []);

function handlePageChanged(newPage: number) {
  query.value.page = newPage;
  refresh();
}
</script>