<template>
  <menu class="topbar">
    <div class="topbar__section">
      <h1 class="layout__title">Vue of Life</h1>
    </div>

    <div class="topbar__section">
      <button v-if="isEditing" class="button" @click="modals.shape = true">Select shape</button>
      <output v-else>Generation: {{ generation }}</output>
    </div>

    <div class="topbar__section">
      <template v-if="!isRunning">
        <template v-if="isEditing">
          <button class="topbar__button button" @click="toggleEditor">Cancel</button>
          <button class="topbar__button button" @click="onSave">Save</button>
        </template>

        <template v-else>
          <button class="topbar__button button" @click="modals.import = true">Import</button>
          <button class="topbar__button button" @click="modals.export = true">Export</button>
          <button class="topbar__button button" @click="toggleEditor">Edit</button>
          <button class="topbar__button button" @click="clearGrid">Clear</button>
          <button v-if="generation > 0" class="topbar__button button" @click="resetGridState">Reset</button>
        </template>
      </template>

      <template v-if="!isEditing">
        <output v-if="timing">{{ timing }}ms</output>
        <button class="topbar__button button" @click="togglePlay">{{ mainActionButtonLabel }}</button>
      </template>
    </div>
  </menu>

  <ModalExport v-if="modals.export" @close="modals.export = false" />
  <ModalImport v-if="modals.import" @close="modals.import = false" />
  <ModalSelectShape v-if="modals.shape" @close="modals.shape = false" />
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useGrid, useGridEditor } from '@/comps';
import { ModalExport, ModalImport, ModalSelectShape } from '../modals';

const { grid, generation, timing, isRunning, isEditing, resetGridState, clearGrid, togglePlay, toggleEditor } =
  useGrid();

const modals = reactive({
  export: false,
  import: false,
  shape: false,
});

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
