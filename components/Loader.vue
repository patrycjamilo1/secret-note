<template>
    <span class="loader"></span>
</template>

<style scoped>
.loader {
    width: 32px;
    height: 32px;
    border: 3px solid;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    @apply border-asset-600 dark:border-white contrast:border-black;
    border-bottom-color: transparent !important;
  }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>