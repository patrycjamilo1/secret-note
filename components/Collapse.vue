<template>
    <div class="collapse-wrapper" v-auto-animate>
        <button type="button" class="action-button collapse-button" :aria-expanded="isOpen" :aria-controls="randomId" title="Toggles collapse menu and shows the content" @click="isOpen = !isOpen">
            {{ isOpen ? openedCollapseTitle ?? title : title }}
            <font-awesome v-if="icon" :icon="icon" />
        </button>
        <div class="collapse-content" v-if="isOpen" :id="randomId">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    title: string;
    openedCollapseTitle?: string;
    icon?: string;
}
defineProps<Props>();
const isOpen = ref(false);
const randomId = crypto.randomUUID();
</script>

<style scoped>
.collapse-wrapper {
    width: 80%;
}

.collapse-content {
    margin-top: 10px;
    padding: 1em;
    @apply bg-accent;
}
</style>