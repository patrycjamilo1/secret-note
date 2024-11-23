<template>
    <div class="logged-out-layout">
        <div class="triangle-top-left" />
        <div class="content">
            <Header>
               <NuxtLink to="/" class="text-3xl text-white">Secret Note</NuxtLink>
               <nav class="flex gap-2 items-center">
                  <NuxtLink to="/login" class="underline">Sign in</NuxtLink>
                  <span class="w-2 h-full">|</span>
                  <NuxtLink to="/register" class="underline">Sign up</NuxtLink>
               </nav>
            </Header>
            <slot />
        </div>
        <div class="triangle-bottom-right" />
    </div>
</template>

<style scoped>
.looged-out-layout {
    @apply h-screen;
}
.logged-out-layout:slotted(> *){
    position: relative;
    z-index: 1;
}
</style>