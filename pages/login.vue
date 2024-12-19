<template>
    <section class="secret-form-section">
        <h1 class="sr-only">Login form</h1>
        <form class="login-form form" autocomplete="new-password" @submit.prevent="handleSubmit" @blur.capture="handleBlur" novalidate>
            <FormHeader />
            <div class="form-input-wrapper">
                <label for="login" class="form-label">E-mail</label>
                <div class="form-input-row">
                    <input type="email" name="email" class="form-input" data-rules="required|email" />
                </div>
                <p class="input-error" v-if="errors.email">{{ errors.email }}</p>
            </div>
            <div class="form-input-wrapper">
                <label for="password" class="form-label form-label-with-icon">Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" name="password" class="form-input" autocomplete="new-password" data-rules="required" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.password">{{ errors.password }}</p>
            </div>
            <NuxtLink to="/register">Do not have an account? Sign up</NuxtLink>
            <button type="submit" class="submit-button action-button">
                Sign in
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import type { FetchErrorWithMessage, Tokens } from '~/types/api';

definePageMeta({
    layout: 'logged-out'
})

const { $api, $toast } = useNuxtApp();
const isPasswordShown = ref(false);
const authStore = useAuthStore();
const { errors, validateForm, handleBlur, clearErrors, setErrors } = useFormValidation();
async function handleSubmit(e: Event) {
    clearErrors();
    const targetForm = e.target as HTMLFormElement;

    if (validateForm(targetForm)) {
        try {
            const formData = useFormData(targetForm);
            const tokens = await $api.post<Tokens>('auth/local/signin', formData);
            authStore.token = tokens.access_token;
            localStorage.setItem('refresh_token', tokens.refresh_token);
            const tokenCookie = useCookie('token', { maxAge: 60 * 1000 * 15 });
            tokenCookie.value = tokens.access_token;    
            navigateTo('/');
        }
        catch(ex) {
            const { formFormattedMessages, message } = useCustomError(ex as FetchErrorWithMessage);
            if (message)
                $toast.error(message);
            setErrors(formFormattedMessages);
        }
  }
}
</script>