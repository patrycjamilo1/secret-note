<template>
    <section class="secret-form-section flex-col gap-5">
        <h1>Your profile</h1>
        <form autocomplete="new-password" class="form max-w-[600px]" @submit.prevent="handleSubmit" @blur.capture="handleBlur" novalidate>
            <FileUpload @update:file="profilePicture = $event" :image-url="authStore.user?.image" />
            <div class="form-input-wrapper form-input-wrapper-full">
                <label for="theme" class="form-label">Theme</label>
                    <div class="form-input-row">
                        <ColorScheme placeholder="Loading theme settings..." tag="span">
                            <select v-model="$colorMode.preference" class="form-input">
                                <option value="system">System</option>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="contrast">Contrast</option>
                            </select>
                        </ColorScheme>
                    </div>
                <p class="input-error" v-if="errors.login">{{ errors.email }}</p>
            </div>
            <div class="form-input-wrapper form-input-wrapper-full">
                <label for="email" class="form-label">E-mail</label>
                <div class="form-input-row">
                    <input type="text" name="email" class="form-input" :placeholder="authStore.user?.email" />
                </div>
                <p class="input-error" v-if="errors.email">{{ errors.email }}</p>
            </div>
            <div class="form-input-wrapper form-input-wrapper-full">
                <label for="password" class="form-label form-label-with-icon">Password</label>
                <div class="form-input-row with-icon">
                    <input :type="isPasswordShown ? 'text' : 'password'" autocomplete="new-password" name="password" class="form-input" />
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
import type { FetchErrorWithMessage } from '~/types/api';

const { errors, clearErrors, handleBlur, setErrors } = useFormValidation();
const { $api, $toast } = useNuxtApp()
const authStore = useAuthStore();
const profilePicture = ref<File | null>(null);

async function uploadProfileImage(file: File): Promise<string> {
    return await uploadImage(file);
}

async function patchData(data: any): Promise<{ success: boolean }> {
  try {
    const response  = await $api.patch<UserData>(`users/${authStore.user?.id}`, data);
    authStore.user = response;
    return { success: true }
  }
  catch(ex) {
    const { formFormattedMessages, message } = useCustomError(ex as FetchErrorWithMessage);
    if (message)
        $toast.error(message);
    setErrors(formFormattedMessages);
    return { success: false };
  }
}

async function handleSubmit(e: Event) {
    clearErrors();
    const targetForm = e.target as HTMLFormElement;
    const formData = useFormData(targetForm);
    const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
    );
    const noFormChanges = Object.keys(filteredData).length === 0;
    const noProfilePicture = profilePicture.value === null;
    if (noFormChanges && noProfilePicture) {
        $toast.info("No new data to update.");
        return;
    }

    let imageUrl: string | null = null;
    if (profilePicture.value) {
        try {
            imageUrl = await uploadProfileImage(profilePicture.value);
        } catch (error) {
            $toast.error("Failed to upload profile picture. Please try again.");
            return;
        }
    }
    if (imageUrl) {
        filteredData.image = imageUrl;
    }
    try {
        const response = await patchData(filteredData);
        if (response.success) {
            $toast.success("Profile updated successfully!");
        } else {
            $toast.error("Failed to update profile. Please try again.");
        }
    } catch (error) {
        $toast.error("Failed to update profile. Please try again.");
    }
}
const isPasswordShown = ref(false);
</script>