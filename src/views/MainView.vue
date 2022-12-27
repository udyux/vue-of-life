<template>
  <main class="layout">
    <menu class="topbar">
      <div class="topbar__section">
        <h1 class="layout__title">{{ title }}</h1>
      </div>

      <div class="topbar__section">
        <output>Generation: {{ generation }}</output>
      </div>

      <div class="topbar__section">
        <button v-if="!isRunning && generation > 0" class="topbar__button" @click="resetGridState">Reset</button>
        <button v-if="!isRunning && !generation" class="topbar__button" @click="logState">Log</button>
        <button class="topbar__button" @click="togglePlay">{{ mainActionButtonLabel }}</button>
      </div>
    </menu>

    <GameGrid />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGameGrid } from '@/comps';
import GameGrid from '@/components/GameGrid.vue';

const title = 'Game of Life';
const { generation, isRunning, logState, resetGridState, togglePlay } = useGameGrid();

const mainActionButtonLabel = computed(() => {
  if (isRunning.value) return 'Pause';
  return !generation.value ? 'Start' : 'Resume';
});
</script>
