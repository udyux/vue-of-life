import { watch } from 'vue';
import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';

export default (grid: Ref<Grid>, generation: Ref<number>, isRunning: Ref<boolean>) => {
  watch(() => generation.value, generationTick);

  function getCellValue([x, y]: Coordinates) {
    return grid.value[x][y];
  }

  function getNeighbors([x, y]: Coordinates): Coordinates[] {
    const xLeft = !x ? grid.value.length - 1 : x - 1;
    const xRight = (x + 1) % grid.value.length;
    const yUp = !y ? grid.value[0].length - 1 : y - 1;
    const yDown = (y + 1) % grid.value[0].length;

    return [
      [xLeft, yUp],
      [xLeft, y],
      [xLeft, yDown],
      [x, yUp],
      [x, yDown],
      [xRight, yUp],
      [xRight, y],
      [xRight, yDown],
    ];
  }

  function shouldCellLive([x, y]: Coordinates, isAlive: boolean) {
    const livingNeighbors = getNeighbors([x, y]).reduce<boolean[]>(
      (living, coords) => (getCellValue(coords) ? [...living, true] : living),
      []
    ).length;

    return livingNeighbors === 3 || (isAlive && livingNeighbors === 2);
  }

  function nextGeneration() {
    generation.value += 1;
  }

  function generationTick() {
    if (!isRunning.value) return;
    grid.value = grid.value.map((column, x) => column.map((isAlive, y) => shouldCellLive([x, y], isAlive)));
    setTimeout(nextGeneration);
  }

  return { startIterations: nextGeneration };
};
