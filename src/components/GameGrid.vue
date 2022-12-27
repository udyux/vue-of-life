<template>
  <section ref="gameNode" class="grid" :class="{ '-paused': !isRunning }">
    <article v-for="(column, x) in grid" :key="x" class="grid__column" :style="{ '--cell-size': `${cellSize}px` }">
      <output
        v-for="(isAlive, y) in column"
        :key="y"
        class="grid__cell"
        :class="{ '-alive': isAlive }"
        :style="{ '--cell-size': `${cellSize}px` }"
        @click="onClickCell(x, y, isAlive)"
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameGrid } from '@/comps';
import { initialStates } from '@/models';

const cellSize = 10;

const gameNode = ref<HTMLElement | null>(null);

const { grid, isRunning, setGridState, setCellValue } = useGameGrid();

onMounted(() => {
  if (!gameNode.value) return;
  const { clientWidth, clientHeight } = gameNode.value;
  const columnCount = Math.floor(clientWidth / cellSize);
  const rowCount = Math.floor(clientHeight / cellSize);
  setGridState(columnCount, rowCount, initialStates.twinLauncher.state);
});

function onClickCell(x: number, y: number, isAlive: boolean) {
  if (!isRunning.value) setCellValue([x, y], !isAlive);
}
</script>
