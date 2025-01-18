<template>
    <section class="secret-form-section">
        <h1 class="sr-only">Registration form</h1>
        <form class="login-form form" @submit.prevent="handleSubmit" @blur.capture="handleBlur" novalidate>
            <FormHeader />
            <div class="form-input-wrapper">
                <label for="login" class="form-label">Login</label>
                <div class="form-input-row">
                    <input type="text" name="login" class="form-input" data-rules="required" />
                </div>
                <p class="input-error" v-if="errors.login">{{ errors.login }}</p>
            </div>
            <div class="form-input-wrapper">
                <label for="email" class="form-label">E-mail</label>
                <div class="form-input-row">
                    <input type="email" name="email" class="form-input" data-rules="required|email" />
                </div>
                <p class="input-error" v-if="errors.email">{{ errors.email }}</p>
            </div>
            <div class="form-input-wrapper">
                <label for="password" class="form-label form-label-with-icon">Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" name="password" class="form-input" data-rules="required|minLength:8|minLowercase:1|minUppercase:1|minNumbers:1|minSymbols:1" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.password">{{ errors.password }}</p>
            </div>
            <div class="form-input-wrapper">
                <label for="passwordConfirm" class="form-label form-label-with-icon">Confirm Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" name="passwordConfirm" class="form-input" data-rules="required|matches:password" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</p>
            </div>
            <NuxtLink to="/login">Already have an account? Sign in</NuxtLink>
            <button type="submit" class="submit-button action-button" :disabled="isLoading">
                <Loader v-if="isLoading" />
                <span v-else>Sign up</span>
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import type { FetchErrorWithMessage } from '~/types/api';

interface FormData extends Record<string, string> {
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
const isPasswordShown = ref(false);
const { $api, $toast } = useNuxtApp();
const isLoading = ref(false);
const { executeRecaptcha } = useGoogleRecaptcha();
const { errors, validateForm, handleBlur, clearErrors, setErrors } = useFormValidation();
async function handleSubmit(e: Event) {
    clearErrors();
    const targetForm = e.target as HTMLFormElement;

    if (validateForm(targetForm)) {
        try {
            isLoading.value = true;
            const { token } = await executeRecaptcha('submit')
            const formData = useFormData(targetForm);
            const formDataWithCaptcha = { ...formData, gRecaptchaResponse: token };
            await $api.post('auth/local/signup', formDataWithCaptcha);
            navigateTo('/login');
            $toast.success('User successfully registered, you can now log in');
        }
        catch(ex) {
            const { formFormattedMessages, message } = useCustomError(ex as FetchErrorWithMessage);
            if (message)
                $toast.error(message);
            setErrors(formFormattedMessages);
        }
        finally {
            isLoading.value = false;
        }
    }
}
</script>