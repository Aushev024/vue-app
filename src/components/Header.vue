<template>
  <div class="w-full p-4 bg-white dark:bg-gray-800 shadow-md mb-4">
    <div class="flex items-center justify-center space-x-4">
      <input
          v-model="albumIdsInput"
          type="text"
          placeholder="Введите ID альбомов (разделенные пробелом)"
          class="px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
          @click="searchPhotos"
          :disabled="isLoading"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <span v-if="!isLoading">Поиск</span>
      <span v-else>
          Загрузка...
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { usePhotoStore } from '@/stores/photoStore';

const photoStore = usePhotoStore();
const albumIdsInput = ref('');
const isLoading = computed(() => photoStore.isLoading);

const searchPhotos = async () => {
  const albumIds = albumIdsInput.value.trim();
  await photoStore.fetchPhotos(albumIds);
};

watch(albumIdsInput, (newVal) => {
  localStorage.setItem('albumIds', newVal);
});

const mounted = () => {
  const storedAlbumIds = localStorage.getItem('albumIds');
  if (storedAlbumIds) {
    albumIdsInput.value = storedAlbumIds;
  }
};

mounted();
</script>