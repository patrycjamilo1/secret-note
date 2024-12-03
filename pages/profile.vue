<template>
    <section class="secret-form-section flex-col gap-5">
        <h1>Your profile</h1>
        <form autocomplete="new-password" class="form max-w-[600px]">
            <UAvatar alt="User avatar" :src="BlankUser" size="3xl" />
            <div class="form-input-wrapper form-input-wrapper-full">
                <label for="email" class="form-label">E-mail</label>
                <div class="form-input-row">
                    <input type="text" name="email" class="form-input" data-rules="required|email" />
                </div>
                <p class="input-error" v-if="errors.login">{{ errors.email }}</p>
            </div>
            <div class="form-input-wrapper form-input-wrapper-full">
                <label for="password" class="form-label form-label-with-icon">Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" autocomplete="new-password" name="password" class="form-input" data-rules="required|minLength:8|minLowercase:1|minUppercase:1|minNumbers:1|minSymbols:1" />
                    <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                        <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                    </button>
                </div>
                <p class="input-error" v-if="errors.password">{{ errors.password }}</p>
            </div>
            <button type="submit" class="submit-button action-button">
                Update my profile info
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import BlankUser from '~/assets/images/user-blank.png';
const { errors } = useFormValidation();
const isPasswordShown = ref(false);
</script>