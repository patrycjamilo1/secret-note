import type { ToastInterface } from "vue-toastification";
import type { ApiModel } from "./composables.types";

export interface PluginsInjections {
  $toast: ToastInterface;
  $api: ApiModel;
}
