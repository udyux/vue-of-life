<template>
  <div ref="gridNode" class="grid -shape">
    <ul v-for="(column, x) in grid" :key="x" class="grid__column" :style="{ '--cell-size': `${cellSize}px` }">
      <li
        v-for="(isAlive, y) in column"
        :key="y"
        class="grid__cell"
        :class="{ '-alive': isAlive }"
        :style="{ '--cell-size': `${cellSize}px` }"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Coordinates } from '@/types/grid';
import { ref, computed, onMounted } from 'vue';

const props = defineProps<{ shape: Coordinates[] }>();

const cellSize = 5;
const minGridHeight = 11;

const gridNode = ref<HTMLDivElement | null>(null);
const gridSize = ref<number[]>([]);

const grid = computed(() => {
  if (!gridSize.value.length) return [];
  const [columnCount, rowCount] = gridSize.value;
  const [cx, cy] = [Math.floor(columnCount * 0.5), Math.floor(rowCount * 0.5)];
  const shapeGrid = Array.from(Array(columnCount), () => Array.from(Array(rowCount), () => false));

  props.shape.forEach(([x, y]) => {
    shapeGrid[cx + x][cy + y] = true;
  });

  return shapeGrid;
});

onMounted(() => {
  if (!gridNode.value) return;
  const rangeX = Math.floor(gridNode.value.clientWidth / cellSize);
  const width = !(rangeX % 2) ? rangeX + 1 : rangeX;

  const rangeY = props.shape
    .reduce<number[]>(
      ([minY, maxY], [_x, y]) => {
        return [Math.min(y, minY), Math.max(y, maxY)];
      },
      [0, 0]
    )
    .reduce((n, bound) => Math.abs(bound) + n, 0);

  const height = !(rangeY % 2) ? rangeY + 7 : rangeY + 6;
  gridSize.value = [width, Math.max(height, minGridHeight)];
});
</script>
