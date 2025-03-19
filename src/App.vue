<script setup>
import Header from '@/components/Header.vue';
import PhotoTable from '@/components/PhotoTable.vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import { onMounted } from 'vue';
import { usePhotoStore } from '@/stores/photoStore';

const photoStore = usePhotoStore();

onMounted(async () => {
  photoStore.photos = [];
  photoStore.displayedPhotos = [];
  photoStore.currentPage = 1;
  await photoStore.fetchPhotos();
});
</script>

<template>
  <div class="flex flex-col items-center justify-start min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Header />
    <PhotoTable />
    <ThemeSwitcher />
  </div>
</template>

