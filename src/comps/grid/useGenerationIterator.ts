import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';
import { ref, watch } from 'vue';
import useGridState from './useGridState';

declare global {
  interface Window {
    logTiming?: boolean;
  }
}

window.logTiming = false;
let prevGenTiming = 0;
const timing = ref<number>(0);

export default (grid: Ref<Grid>, generation: Ref<number>, isRunning: Ref<boolean>) => {
  const { getCellValue, wrapCoordinates, saveInitialState } = useGridState(grid, generation);

  watch(() => generation.value, generationTick);

  function getCellNeighbors([x, y]: Coordinates): Coordinates[] {
    const neighbors: Coordinates[] = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ];

    return neighbors.map(wrapCoordinates);
  }

  function shouldCellLive([x, y]: Coordinates, isAlive: boolean) {
    const livingNeighbors = getCellNeighbors([x, y]).filter(getCellValue).length;
    return livingNeighbors === 3 || (isAlive && livingNeighbors === 2);
  }

  function nextGeneration() {
    if (isRunning.value) generation.value += 1;
    if (window.logTiming) logTiming();
  }

  function generationTick() {
    if (!isRunning.value) return;
    grid.value = grid.value.map((column, x) => column.map((isAlive, y) => shouldCellLive([x, y], isAlive)));
    setTimeout(nextGeneration);
  }

  function logTiming() {
    const now = Date.now();
    if (prevGenTiming) timing.value = now - prevGenTiming;
    prevGenTiming = now;
  }

  return {
    timing,
    startIterations() {
      if (generation.value === 0) saveInitialState();
      nextGeneration();
    },
  };
};
