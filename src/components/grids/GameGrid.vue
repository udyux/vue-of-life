<template>
  <section ref="gameNode" class="grid">
    <ul v-for="(column, x) in grid" :key="x" class="grid__column" :style="{ '--cell-size': `${cellSize}px` }">
      <li
        v-for="(isAlive, y) in column"
        :key="y"
        class="grid__cell"
        :class="{ '-alive': isAlive }"
        :style="{ '--cell-size': `${cellSize}px` }"
      />
    </ul>

    <EditorGrid v-if="isEditing" v-bind="editorProps" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGrid } from '@/comps';
import { methuselahs } from '@/models/shapes';
import EditorGrid from './EditorGrid.vue';

const { grid, isEditing, createGrid } = useGrid();

const gameNode = ref<HTMLElement | null>(null);

const cellSize = 10;
const editorProps = { grid, cellSize };

onMounted(() => {
  if (!gameNode.value) return;
  const { clientWidth, clientHeight } = gameNode.value;
  const columnCount = Math.floor(clientWidth / cellSize);
  const rowCount = Math.floor(clientHeight / cellSize);
  createGrid(columnCount, rowCount, methuselahs.shapes.acorn.state);
});
</script>
