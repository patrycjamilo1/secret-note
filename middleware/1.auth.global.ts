import { jwtDecode } from 'jwt-decode';
import type { UserData } from '~/stores/auth.store';

interface TokenData {
    sub: number;
    email: string;
}

export default defineNuxtRouteMiddleware(async (to) =>
{
    const { $api } = useNuxtApp();
    const { ssrContext } = useNuxtApp();
    const authStore = useAuthStore();

    const token = useCookie('token');

    if (import.meta.server)
    {
        authStore.token = token.value || '';

        if (token.value)
            $api.setHeader({ ...ssrContext?.event.node.req.headers as Record<string, unknown>, Authorization: `Bearer ${token.value}` });
    }

    if (authStore.token)
    {
        $api.setHeader({ Authorization: `Bearer ${authStore.token}` });
    }

    if (!authStore.user && authStore.token)
    {
        const tokenData = jwtDecode<TokenData>(authStore.token);

        try
        {
            const userResponse = await $api.get<UserData>(`users/${tokenData.sub}`);
            const userModel: UserData = { id: userResponse.id, email: userResponse.email, image: userResponse.image, login: userResponse.login };

            authStore.user = userModel;
        }
        catch (err)
        {
            authStore.token = '';
            authStore.user = null;
            if(to.path !== '/')
                navigateTo('/');
        }
    }

    if(!authStore.user && !authStore.token) {
        return;
    }
});