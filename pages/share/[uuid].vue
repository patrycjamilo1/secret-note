<template>
    <section class="secret-form-section flex flex-col gap-8">
        <h1 class="max-w-[400px] text-center">Here's the link to share your message with other person</h1>
        <div class="share-link-container flex">
            <input
                type="text"
                :value="shareUrl"
                readonly
                class="share-link-input contrast:bg-black"
            />
            <button type="button" @click="copyLink" class="copy-button action-button text-white">
                <font-awesome icon="copy" />
            </button>
        </div>
        <p v-if="copySuccess" class="copy-success text-green-500">Link copied to clipboard!</p>
        <p>Remember that message will be deleted after the read process, so do not open the link by yourself!</p>
    </section>
</template>

<script setup lang="ts">

const shareUrl = ref('');
const copySuccess = ref(false);

const route = useRoute();
const uuid = route.params.uuid as string;

if(uuid) {
    const { protocol, host } = window.location;
    const base = `${protocol}//${host}`;
    shareUrl.value = `${base}/messages/read/${uuid}`;
}
else {
    shareUrl.value = 'Invalid message UUID.';
}
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (error) {
    console.error('Failed to copy the link: ', error);
  }
};
</script>

<style scoped>
.share-link-container {
   @apply w-full rounded-sm border-2 border-asset-600;
}
.share-link-input {
    padding: 1rem;
    width: 100%;
}
.copy-button {
    @apply bg-asset-600 text-xl px-4 rounded-none;
}
</style>