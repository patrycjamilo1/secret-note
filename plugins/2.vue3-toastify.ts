import { useToast } from 'vue-toast-notification';  
export default defineNuxtPlugin(nuxtApp => {
    const toast = useToast({ position: 'top-right', duration: 5000 });   
    return {
        provide: {
            toast,
        }     
    }
})