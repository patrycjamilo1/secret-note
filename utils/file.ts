import type { FetchErrorWithMessage } from '~/types/api';

export async function uploadImage(file: File)
{
    const { $api } = useNuxtApp();
    const formData = new FormData();

    formData.append('file', file);

    try
    {
        const imageUrl = await $api.postFormData<string>('upload/image', formData);

        return imageUrl;
    }

    catch (err)
    {
        const { message } = useCustomError(err as FetchErrorWithMessage);

        throw new Error(message as string);
    }
}