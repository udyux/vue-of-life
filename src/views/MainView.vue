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
        <template v-if="!isRunning">
          <template v-if="isEditing">
            <button class="topbar__button" @click="toggleEditor">Cancel</button>
            <button class="topbar__button" @click="onSave">Save</button>
          </template>
          <button v-else class="topbar__button" @click="toggleEditor">Edit</button>
          <button v-if="generation > 0" class="topbar__button" @click="resetGridState">Reset</button>
        </template>

        <button v-if="!isEditing" class="topbar__button" @click="togglePlay">{{ mainActionButtonLabel }}</button>
      </div>
    </menu>

    <GameGrid />
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGrid, useGridEditor } from '@/comps';
import GameGrid from '@/components/GameGrid.vue';

const title = 'Game of Life';
const { grid, generation, isRunning, isEditing, resetGridState, togglePlay, toggleEditor } = useGrid();

const mainActionButtonLabel = computed(() => {
  if (isRunning.value) return 'Pause';
  return !generation.value ? 'Start' : 'Resume';
});

let gridEditor: ReturnType<typeof useGridEditor> | undefined;

async function onSave() {
  if (!gridEditor) gridEditor = useGridEditor(grid);
  await gridEditor.commitToGrid();
  toggleEditor();
}
</script>
