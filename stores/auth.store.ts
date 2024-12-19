import { acceptHMRUpdate, defineStore } from 'pinia';

export interface UserData {
    id: number;
    email: string;
    login: string;
    image?: string;
    createdAt?: string;
}
export interface AuthState {
    token: string;
    user: UserData | null;
}

export const useAuthStore = defineStore('authStore', {
    state: (): AuthState => ({
        token: '',
        user: null
    }),
});

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));