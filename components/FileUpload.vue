<template>
    <div class="custom-file-upload">
      <div class="preview-container">
        <UAvatar  v-if="preview || imageUrl"  alt="User preview" :src="preview || imageUrl" size="3xl" />
        <UAvatar v-else  :src="BlankUser" size="3xl" alt="No avatar preview at the moment" />
      </div>
      <button type="button" class="action-button submit-button !mt-0" @click="triggerFileSelect">Select File</button>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden-file-input"
        @change="onFileChange"
      />
    </div>
  </template>
  
<script setup lang="ts">
import BlankUser from '~/assets/images/user-blank.png';
  const props = withDefaults(defineProps<{
    imageUrl?: string,
    file?: File | null
  }>(), {
    imageUrl: '',
    file: null
  });
  
  const emit = defineEmits<{
    (e: 'update:file', file: File | null): void;
  }>();
  
  const fileInput = ref<HTMLInputElement | null>(null);
  const preview = ref<string>('');
  
  // Watch for changes in the file prop to update preview
  watch(
    () => props.file,
    (newFile) => {
      if (newFile) {
        generatePreview(newFile);
      } else {
        preview.value = '';
      }
    },
    { immediate: true }
  );
  
  function triggerFileSelect() {
    fileInput.value?.click();
  }
  
  async function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      emit('update:file', file);
      await generatePreview(file);
    } else {
      emit('update:file', null);
      preview.value = '';
    }
  }

    function removeImage() {
        emit('update:file', null);
        preview.value = '';
    }
  
  function generatePreview(file: File) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          preview.value = e.target.result;
          resolve();
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }
  </script>
  
<style scoped>
    .custom-file-upload {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;
    }

    .hidden-file-input {
        display: none;
    }
</style>