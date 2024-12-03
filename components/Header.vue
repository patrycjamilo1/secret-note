<template>
    <header>
        <slot />
    </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
header {
    @apply bg-asset-600 p-4 flex flex-col md:flex-row rounded-sm justify-between items-center text-white;
}
</style>