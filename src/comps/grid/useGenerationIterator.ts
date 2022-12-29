import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';
import { watch } from 'vue';
import useGridState from './useGridState';

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
  }

  function generationTick() {
    if (!isRunning.value) return;
    grid.value = grid.value.map((column, x) => column.map((isAlive, y) => shouldCellLive([x, y], isAlive)));
    setTimeout(nextGeneration);
  }

  return {
    startIterations() {
      saveInitialState();
      nextGeneration();
    },
  };
};
