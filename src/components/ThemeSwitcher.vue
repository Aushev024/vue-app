<template>
  <button @click="toggleTheme" class="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
    Переключить тему
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme';

const { toggleTheme } = useTheme();
</script>