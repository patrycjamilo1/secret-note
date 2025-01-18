<template>
    <section class="secret-form-section flex flex-col gap-6">
      <h1 class="text-center">View Your Secret Message</h1>
      <div class="error-zone bg-red-500 p-5 text-white" v-if="error">
        <p>{{ error }}</p>
      </div>
  
      <!-- Password Form -->
      <div v-if="isPasswordProtected && !decryptedMessage" class="flex flex-col gap-3 items-center">
        <form @submit.prevent="submitPassword" class="form">
          <p class="text-center mb-3">This message is password-protected. Please enter the password to view it.</p>
          <div class="form-input-wrapper">
            <label for="login" class="form-label">Password to unlock message</label>
            <div class="form-input-row">
              <input
                type="password"
                name="password"
                v-model="password"
                class="form-input"
                autocomplete="new-password"
              />
            </div>
          </div>
          <button type="submit" class="action-button bg-asset-600">Decrypt Message</button>
        </form>
        <p v-if="passwordError" class="text-red-600">{{ passwordError }}</p>
      </div>
  
      <!-- Decrypted Message -->
      <div v-if="decryptedMessage" class="message-display full-w flex flex-col items-center">
        <p class="secret-message form">{{ decryptedMessage }}</p>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import type { MessageMetadata, ReadMessageResponse } from '~/types/api';
  
  const loading = ref(false);
  const error = ref('');
  const password = ref('');
  const passwordError = ref('');
  const isPasswordProtected = ref(false);
  const decryptedMessage = ref('');
  const route = useRoute();
  const { $api } = useNuxtApp();
  const uuid = route.params.uuid as string;
  
  // Fetch metadata to determine if the message is password-protected
  const fetchMetadata = async () => {
    try {
        loading.value = true;
      const response = await $api.get<MessageMetadata>(`messages/${uuid}/metadata`);
      isPasswordProtected.value = response.isPasswordProtected;
  
      // If not password-protected, fetch the message immediately
      if (!isPasswordProtected.value) {
        await fetchMessage();
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        error.value = 'Message not found.';
      } else if (err.response?.status === 400) {
        error.value = 'This message has expired.';
      } else {
        error.value = 'An unexpected error occurred while fetching metadata.';
      }
    } finally {
      loading.value = false;
    }
  };
  
  // Fetch the secret message
  const fetchMessage = async () => {
    try {
        loading.value = true;
      const requestBody = isPasswordProtected.value ? { password: password.value } : {};
      const response = await $api.post<ReadMessageResponse>(`messages/${uuid}/read`, requestBody);
      decryptedMessage.value = response.secretMessage;
    } catch (err: any) {
      if (err.response?.status === 403) {
        passwordError.value = 'Incorrect password. Please try again.';
      } else if (err.response?.status === 404) {
        error.value = 'Message not found.';
      } else if (err.response?.status === 400) {
        error.value = 'This message has expired.';
      } else {
        passwordError.value = 'An unexpected error occurred while decrypting the message.';
      }
    }
    finally {
        loading.value = false;
    }
  };
  
  // Handle password submission
  const submitPassword = async () => {
    passwordError.value = '';
    await fetchMessage();
  };
  
  // Fetch metadata on component mount
  onMounted(() => {
    if (uuid) {
      fetchMetadata();
    } else {
      error.value = 'Invalid message UUID.';
    }
  });
  </script>
  