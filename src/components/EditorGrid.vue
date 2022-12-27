<template>
  <section class="grid -editor" @mouseleave="onMouseLeave">
    <ul v-for="(column, x) in editorGrid" :key="x" class="grid__column" :style="{ '--cell-size': `${cellSize}px` }">
      <li
        v-for="(isAlive, y) in column"
        :key="y"
        class="grid__cell"
        :class="{ '-alive': isAlive }"
        :style="{ '--cell-size': `${cellSize}px` }"
        @click="commitToEditor"
        @mouseenter="activeCell = [x, y]"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { Grid } from '@/types/grid';
import { onMounted } from 'vue';
import { useGridEditor } from '@/comps';
import { initialStates } from '@/models';

const props = defineProps<{ grid: Ref<Grid>; cellSize: number }>();

const { editorGrid, activeCell, activeShape, createEditorGrid, commitToEditor } = useGridEditor(props.grid);

activeShape.value = initialStates.rPentomino.state;

onMounted(createEditorGrid);

function onMouseLeave() {
  activeCell.value = null;
}
</script>
