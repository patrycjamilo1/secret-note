<template>
    <section class="secret-form-section">
        <h1 class="sr-only">Create your secret here</h1>
        <form class="login-form form">
            <FormHeader />
            <div class="form-input-wrapper">
                <label for="secret-message" class="form-label">Secret message</label>
                <div class="form-input-row">
                    <textarea name="secret-message" class="form-input textarea" placeholder="Type your message here..." rows="5" required />
                </div>
            </div>
            <Collapse title="Add password" opened-collapse-title="Make secret without required password" icon="key">
                <div class="form-input-wrapper full-w">
                    <label for="password" class="form-label form-label-with-icon">Password</label>
                    <div class="form-input-row with-icon">
                        <input :type="isPasswordShown ? 'text' : 'password'" name="password" class="form-input" />
                        <button class="icon-button" type="button" aria-label="Click here to show password as plain text" @click="isPasswordShown = !isPasswordShown">
                            <font-awesome :icon="isPasswordShown ? 'eye' : 'eye-slash'" />
                        </button>
                    </div>
                </div>
            </Collapse>
            <Collapse title="Time duration" opened-collapse-title="Valid till opening" icon="calendar">
                <div class="form-input-wrapper full-w">
                    <label for="valid-until" class="form-label form-label-with-icon">Valid until</label>
                    <div class="form-input-row with-icon">
                        <input type="datetime-local" name="valid-until" class="form-input" />
                    </div>
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
const isPasswordShown = ref(false);
</script>