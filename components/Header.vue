<template>
    <header>
        <slot />
        <div class="flex gap-3 items-end">
            <button title="select smaller font" @click="changeBodyFontSize('small')" class="font-select-button">A</button>
            <button title="select default font" @click="changeBodyFontSize('default')" class="font-select-button">A</button>
            <button title="select bigger font" @click="changeBodyFontSize('big')" class="font-select-button">A</button>
        </div>
    </header>
</template>

<script setup lang="ts">
function changeBodyFontSize(size: 'small' | 'default' | 'big'){
    const root = document.documentElement;

    switch (size) {
        case 'small':
            root.style.setProperty('--base-font-size', '14px'); // Smaller font size
            break;
        case 'default':
            root.style.setProperty('--base-font-size', '16px'); // Default font size
            break;
        case 'big':
            root.style.setProperty('--base-font-size', '18px'); // Larger font size
            break;
    }
}
</script>

<style scoped>
header {
    @apply bg-asset-600 p-4 flex flex-col md:flex-row rounded-sm justify-between items-center text-white;
}
.font-select-button {
    width: 35px;
    height: 35px;
    border: 3px solid;
    @apply border-white font-bold;
}

.font-select-button:nth-child(2n) {
    width: 40px;
    height: 40px;
}

.font-select-button:nth-child(3n) {
    width: 45px;
    height: 45px;
}
</style>