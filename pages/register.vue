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
                    <input :type="isPasswordShown ? 'text' : 'password'" name="password" class="form-input" v-model="password" data-rules="required|minLength:8|minLowercase:1|minUppercase:1|minNumbers:1|minSymbols:1" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.password">{{ errors.password }}</p>
            </div>
            <div class="form-input-wrapper">
                <label for="confirmPassword" class="form-label form-label-with-icon">Confirm Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" name="confirmPassword" class="form-input" data-rules="required|matches:password" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
            </div>
            <NuxtLink to="/login">Already have an account? Sign in</NuxtLink>
            <button type="submit" class="submit-button action-button">
                Sign up
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'logged-out'
})
const isPasswordShown = ref(false);
const password = ref('');
const { errors, validateForm, handleBlur, clearErrors } = useFormValidation();
async function handleSubmit(e: Event) {
    clearErrors();
    const targetForm = e.target as HTMLFormElement;

    if (validateForm(targetForm)) {
    console.log("Form is valid. Proceeding with submission...");
    // Proceed with form submission logic
  } else {
    console.log("Validation failed:", errors);
  }
}
</script>