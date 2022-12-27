import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';

let previousInitialGridState: { columnCount: number; rowCount: number; initialState: Coordinates[] } = {
  columnCount: 0,
  rowCount: 0,
  initialState: [],
};

export default (grid: Ref<Grid>, generation: Ref<number>) => {
  function setGridState(columnCount: number, rowCount: number, initialState: Coordinates[]) {
    previousInitialGridState = { columnCount, rowCount, initialState };
    const [cx, cy] = [Math.floor(columnCount * 0.5), Math.floor(rowCount * 0.5)];
    grid.value = Array.from(Array(columnCount), () => Array.from(Array(rowCount), () => false));
    initialState.forEach(([rx, ry]) => setCellValue([cx + rx, cy + ry], true));
  }

  function resetGridState() {
    const { columnCount, rowCount, initialState } = previousInitialGridState;
    grid.value = [];
    generation.value = 0;
    setGridState(columnCount, rowCount, initialState);
  }

  function setCellValue([x, y]: Coordinates, value = true) {
    grid.value[x][y] = value;
  }

  function getCurrentState() {
    const [cx, cy] = [Math.floor(grid.value.length * 0.5), Math.floor(grid.value[0].length * 0.5)];

    return grid.value.reduce<Coordinates[]>((livingCellMap, column, x) => {
      return [
        ...livingCellMap,
        ...column.reduce<Coordinates[]>((columnMap, isAlive, y) => {
          return isAlive ? [...columnMap, [x - cx, y - cy]] : columnMap;
        }, []),
      ];
    }, []);
  }

  return { setGridState, resetGridState, setCellValue, getCurrentState };
};
