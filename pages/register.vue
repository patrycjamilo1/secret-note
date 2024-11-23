<template>
    <section class="secret-form-section">
        <h1 class="sr-only">Registration form</h1>
        <form class="login-form form">
            <FormHeader />
            <div class="form-input-wrapper">
                <label for="login" class="form-label">Login</label>
                <div class="form-input-row">
                    <input type="text" name="login" class="form-input" required />
                </div>
            </div>
            <div class="form-input-wrapper">
                <label for="email" class="form-label">E-mail</label>
                <div class="form-input-row">
                    <input type="email" name="email" class="form-input" required />
                </div>
            </div>
            <div class="form-input-wrapper">
                <label for="password" class="form-label form-label-with-icon">Password</label>
                <div class="form-input-row with-icon">
                    <input :type="!isPasswordShown ? 'text' : 'password'" name="password" class="form-input" required />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="!isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
            </div>
            <div class="form-input-wrapper">
                <label for="confirmPassword" class="form-label form-label-with-icon">Confirm Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" name="confirmPassword" class="form-input" required />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
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
</script>