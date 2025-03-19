<template>
  <div class="w-full max-w-md lg:max-w-xl flex flex-col items-center justify-center">
    <div class="max-w-2xl w-full flex flex-col items-center justify-center">
      <div v-if="isLoading" class="w-full h-64 flex items-center justify-center">
        <div class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-700 h-8 rounded-md w-full mb-2"></div>
          <div class="bg-gray-300 dark:bg-gray-700 h-8 rounded-md w-full mb-2"></div>
          <div class="bg-gray-300 dark:bg-gray-700 h-8 rounded-md w-full mb-2"></div>
          <div class="bg-gray-300 dark:bg-gray-700 h-8 rounded-md w-full mb-2"></div>
          <div class="bg-gray-300 dark:bg-gray-700 h-8 rounded-md w-full"></div>
        </div>
      </div>

      <div
          v-else
          class="w-full overflow-auto max-h-[600px]"
          @scroll="onScroll"
          ref="tableContainerRef"
      >
        <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10"
          >
          <tr>
            <th
                v-for="(header, key) in tableHeaders"
                :key="key"
                @click="sortBy(key)"
                class="px-4 py-2 cursor-pointer"
            >
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="photo in displayedPhotos"
              :key="photo.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-4 py-2" :title="photo.id">{{ photo.id }}</td>
            <td class="px-4 py-2" :title="photo.albumId">{{ photo.albumId }}</td>
            <td class="px-4 py-2 truncate" :title="photo.title">{{ photo.title }}</td>
            <td class="px-4 py-2 truncate" :title="photo.url">{{ photo.url }}</td>
            <td class="px-4 py-2">
              <img :src="photo.thumbnailUrl" :alt="photo.title" class="w-16 h-16 object-cover rounded" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePhotoStore } from '@/stores/photoStore';
import { debounce } from 'lodash-es';

const photoStore = usePhotoStore();

const isLoading = computed(() => photoStore.isLoading);
const displayedPhotos = computed(() => photoStore.displayedPhotos);
const tableHeaders = computed(() => photoStore.tableHeaders);
const tableContainerRef = ref(null);

const itemsPerScroll = 20;
const loadMoreItems = () => {
  photoStore.loadMoreItems();
};
const debouncedLoadMore = debounce(loadMoreItems, 200);

const onScroll = () => {
  if (!tableContainerRef.value) return;

  const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.value;
  if (scrollTop + clientHeight >= scrollHeight - 20) {
    debouncedLoadMore();
  }
};

const sortBy = (field) => {
  photoStore.sortBy(field);
};
</script>