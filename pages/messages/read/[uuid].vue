<template>
    <section class="secret-form-section flex flex-col gap-6">
        <h1 class="text-center">View Your Secret Message</h1>
        <div class="error-zone bg-red-500 p-5 text-white" v-if="error">
            <p>Message expired or was already read and deleted.</p>
        </div>
        <div v-if="isPasswordProtected && !decryptedMessage" class="flex flex-col gap-3 items-center">
            <form @submit.prevent="submitPassword" class="form">
                <p class="text-center mb-3">This message is password-protected. Please enter the password to view it.</p>
                <div class="form-input-wrapper">
                    <label for="login" class="form-label">Password to unlock message</label>
                    <div class="form-input-row">
                        <input type="password" name="password" v-model="password" class="form-input" autocomplete="new-password" />
                    </div>
                </div>
                <button type="submit" class="action-button bg-asset-600">Decrypt Message</button>
            </form>
            <p v-if="passwordError" class="text-red-600">{{ passwordError }}</p>
        </div>

        <div v-if="decryptedMessage" class="message-display full-w flex flex-col items-center">
            <p class="secret-message form">{{ decryptedMessage }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { MessageMetadata, ReadMessageResponse } from '~/types/api';

const loading = ref(true);
const error = ref('');
const password = ref('');
const passwordError = ref('');
const isPasswordProtected = ref(false);
const decryptedMessage = ref('');

const route = useRoute();

const { $api } = useNuxtApp();
const uuid = route.params.uuid as string;

const fetchMetadata = async () => {
    loading.value = true;
    const { data, error: err } = await useAsyncData(async () => {
        return await $api.get<MessageMetadata>(`messages/${uuid}/metadata`);
    });
    if(data.value) {
        isPasswordProtected.value = data.value.isPasswordProtected;

        if (!isPasswordProtected.value) {
            await fetchMessage();
        }
    }
    else if (err.value) {
        if (err.value && err.value.statusCode === 404) {
            error.value = 'Message not found.';
        } else if (err.value && err.value.statusCode === 400) {
            error.value = 'This message has expired.';
        } else {
            error.value = 'An unexpected error occurred while fetching message metadata.';
        }
    }
    loading.value = false;
};

const fetchMessage = async () => {
    loading.value = true;
    const requestBody = isPasswordProtected.value
        ? { password: password.value }
        : {};
    const { data, error: err } = await useAsyncData(async () => {
        return await $api.post<ReadMessageResponse>(`messages/${uuid}/read`, requestBody);
    })

    if(data.value) {
        decryptedMessage.value = data.value.secretMessage;
    }
    else if (err.value) {
        if (err.value && err.value.statusCode === 403) {
        passwordError.value = 'Incorrect password. Please try again.';
        } else if (err.value && err.value.statusCode === 404) {
        error.value = 'Message not found.';
        } else if (err.value && err.value.statusCode === 400) {
        error.value = 'This message has expired.';
        } else {
        passwordError.value = 'An unexpected error occurred while decrypting the message.';
        }
    }
    loading.value = false;
};

const submitPassword = async () => {
  passwordError.value = '';
  await fetchMessage();
};

if (uuid) {
    fetchMetadata();
  } else {
    error.value = 'Invalid message UUID.';
    loading.value = false;
  }
</script>