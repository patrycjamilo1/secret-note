<template>
   <div class="app-layout">
        <div class="triangle-top-left"></div>
        <div class="content">
            <Header v-if="!authStore.user">
               <NuxtLink to="/" class="text-3xl text-white contrast:text-black">Secret Note</NuxtLink>
               <nav class="flex gap-2 items-center">
                  <NuxtLink to="/login" class="underline">Sign in</NuxtLink>
                  <span class="w-2 h-full">|</span>
                  <NuxtLink to="/register" class="underline">Sign up</NuxtLink>
               </nav>
            </Header>
            <Header v-else>
               <NuxtLink to="/" class="text-3xl text-white contrast:text-black">Secret Note</NuxtLink>
               <nav class="flex gap-2 items-center">
                  <NuxtLink to="/messages" class="underline">Messages</NuxtLink>
                  <span class="w-2 h-full">|</span>
                  <button type="button" class="underline" @click="logout">Logout</button>
                  <span class="w-2 h-full">|</span>
                  <NuxtLink to="/profile" class="profile-link">
                     <UAvatar alt="User avatar" :src="authStore.user?.image || BlankUser" size="md" />
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

const { $api } = useNuxtApp();
const authStore = useAuthStore();

async function logout()
{
    try
    {
        await $api.post('/auth/logout');
        authStore.token = '';

        const authCookie = useCookie('token');

        authCookie.value = null;

        localStorage.setItem('refreshToken', '');
        authStore.user = null;
        navigateTo('/login');
    }
    catch (error)
    {
        authStore.token = '';

        const authCookie = useCookie('token');

        authCookie.value = null;

        localStorage.setItem('refreshToken', '');
        authStore.user = null;
        navigateTo('/login');
    }
}
</script>

<style scoped>
.contrast .profile-link {
   border: 2px solid;
   @apply border-black block rounded-full w-[44px] h-[44px];
}
</style>