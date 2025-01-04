<template>
    <section class="secret-form-section">
        <h1 class="sr-only">Create your secret here</h1>
        <form class="login-form form" autocomplete="new-password" @submit.prevent="handleSubmit" @blur.capture="handleBlur" novalidate>
            <FormHeader />
            <div class="form-input-wrapper">
                <label for="secret-message" class="form-label">Secret message</label>
                <div class="form-input-row">
                    <textarea name="secretMessage" class="form-input textarea" placeholder="Type your message here..." rows="5" data-rules="required" />
                </div>
                <p class="input-error" v-if="errors.secretMessage">{{ errors.secretMessage }}</p>
            </div>
            <Collapse title="Add password" opened-collapse-title="Make secret without required password" icon="key">
                <div class="form-input-wrapper full-w">
                    <label for="password" class="form-label form-label-with-icon">Password</label>
                    <div class="form-input-row with-icon">
                        <input :type="isPasswordShown ? 'text' : 'password'" name="password" class="form-input" autocomplete="new-password" data-rules="required" />
                        <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                            <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                        </button>
                    </div>
                    <p class="input-error" v-if="errors.password">{{ errors.password }}</p>
                </div>
            </Collapse>
            <Collapse title="Time duration" opened-collapse-title="Valid till opening" icon="calendar">
                <div class="form-input-wrapper full-w">
                    <label for="valid-until" class="form-label form-label-with-icon">Valid until</label>
                    <div class="form-input-row with-icon">
                        <input type="datetime-local" name="validUntil" class="form-input" data-rules="required" />
                    </div>
                    <p class="input-error" v-if="errors.validUntil">{{ errors.validUntil }}</p>
                </div>
            </Collapse>
            <button type="submit" class="action-button submit-button">
                Create your secret
            </button>
            <p>Your secure link works only once and than permanently expire</p>
        </form>
    </section>
</template>

<script setup lang="ts">
import type { CreatedMessageResponse, FetchErrorWithMessage } from '~/types/api';

const { $api, $toast } = useNuxtApp();
const isPasswordShown = ref(false);
const { errors, validateForm, handleBlur, clearErrors, setErrors } = useFormValidation();

async function handleSubmit(e: Event) {
    clearErrors();
    const targetForm = e.target as HTMLFormElement;

    if (validateForm(targetForm)) {
        try {
            const formData = useFormData(targetForm);
            const response = await $api.post<CreatedMessageResponse>('messages', formData);
            $toast.success('Message created successfully!');
            targetForm.reset();
            navigateTo(`/share/${response.uuid}`);
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