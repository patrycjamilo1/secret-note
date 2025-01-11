import type { GetUserMessagesDto, PaginatedUserMessagesDto } from "~/types/api";

export function useUserMessages(query: GetUserMessagesDto) {
    const { $api } = useNuxtApp();
  
    return useAsyncData<PaginatedUserMessagesDto>('userMessages', async () =>
      await $api.get('messages', query)
    );
  }