<template>
    <div class="logged-out-layout">
        <div class="triangle-top-left"></div>
        <slot />
        <div class="triangle-bottom-right"></div>
    </div>
</template>

<style scoped>
    .logged-out-layout {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .triangle-top-left {
        position: absolute;
        top: 0;
        left: 0;
        width: min(40vw, 500px);
        aspect-ratio: 1;
        background-color: var(--main);
        clip-path: polygon(0 0, 100% 0, 0 100%);
    }

    .triangle-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
        width: min(40vw, 500px);
        aspect-ratio: 1;
        background-color: var(--main);
        clip-path: polygon(100% 100%, 0 100%, 100% 0);
    }
</style>