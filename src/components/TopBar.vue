<template>
  <menu class="topbar">
    <div class="topbar__section">
      <h1 class="layout__title">Vue of Life</h1>
    </div>

    <div class="topbar__section">
      <output>Generation: {{ generation }}</output>
    </div>

    <div class="topbar__section">
      <template v-if="!isRunning">
        <template v-if="isEditing">
          <button class="topbar__button" @click="toggleEditor">Cancel</button>
          <button class="topbar__button" @click="onSave">Save</button>
        </template>

        <template v-else>
          <button class="topbar__button" @click="toggleEditor">Edit</button>
          <button v-if="generation > 0" class="topbar__button" @click="resetGridState">Reset</button>
        </template>
      </template>

      <button v-if="!isEditing" class="topbar__button" @click="togglePlay">{{ mainActionButtonLabel }}</button>
    </div>
  </menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGrid, useGridEditor } from '@/comps';

const { grid, generation, isRunning, isEditing, resetGridState, togglePlay, toggleEditor } = useGrid();

const mainActionButtonLabel = computed(() => {
  if (isRunning.value) return 'Pause';
  return !generation.value ? 'Start' : 'Resume';
});

async function onSave() {
  await useGridEditor(grid).commitToGrid();
  generation.value = 0;
  toggleEditor();
}
</script>
