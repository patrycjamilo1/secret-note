<template>
   <div class="app-layout">
        <div class="triangle-top-left"></div>
        <div class="content">
            <Header>
               <NuxtLink to="/" class="text-3xl text-white">Secret Note</NuxtLink>
               <nav class="flex gap-2 items-center">
                  <NuxtLink to="/messages" class="underline">Messages</NuxtLink>
                  <span class="w-2 h-full">|</span>
                  <button type="button" class="underline">Logout</button>
                  <span class="w-2 h-full">|</span>
                  <NuxtLink to="/profile">
                     <UAvatar alt="User avatar" :src="BlankUser" size="md" />
                  </NuxtLink>
               </nav>
            </Header>
            <slot />
        </div>
        <div class="triangle-bottom-right"></div>
    </div>
</template>

<script setup>
import BlankUser from '~/assets/images/user-blank.png';
</script>