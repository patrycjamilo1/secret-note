export default defineNuxtRouteMiddleware((to) => {
    const protectedRoutes = ['/messages']
    const authStore = useAuthStore()
  
    if (!authStore.token && protectedRoutes.includes(to.path)) {
      return navigateTo('/login')
    }
  })
  