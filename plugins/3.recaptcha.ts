import { VueReCaptcha } from "vue-recaptcha-v3";
import type { IReCaptchaOptions } from "vue-recaptcha-v3/dist/IReCaptchaOptions";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()
  
    const options: IReCaptchaOptions = {
      siteKey: config.public.captchaKey,
      loaderOptions: {
        autoHideBadge: false,
        useRecaptchaNet: true,
        renderParameters: {
          hl: 'id'
        }
      }
    }
    nuxtApp.vueApp.use(VueReCaptcha, options)
  })