import type { Ref, ComputedRef } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';

let previousInitialGridState: { columnCount: number; rowCount: number; state: Coordinates[] } = {
  columnCount: 0,
  rowCount: 0,
  state: [],
};

export default (grid: Ref<Grid>, generation?: Ref<number>) => {
  function getGridState(gridState: Ref<Grid> | ComputedRef<Grid> = grid) {
    const [cx, cy] = [Math.floor(gridState.value.length * 0.5), Math.floor(gridState.value[0].length * 0.5)];

    return gridState.value.reduce<Coordinates[]>((livingCellMap, column, x) => {
      return [
        ...livingCellMap,
        ...column.reduce<Coordinates[]>((columnMap, isAlive, y) => {
          return isAlive ? [...columnMap, [x - cx, y - cy]] : columnMap;
        }, []),
      ];
    }, []);
  }

  function setGridState(columnCount: number, rowCount: number, state: Coordinates[] = [], isEditor?: boolean) {
    const [cx, cy] = [Math.floor(columnCount * 0.5), Math.floor(rowCount * 0.5)];
    grid.value = Array.from(Array(columnCount), () => Array.from(Array(rowCount), () => false));
    state.forEach(([rx, ry]) => setCellValue([cx + rx, cy + ry], true));

    if (!isEditor && generation && generation.value === 0) {
      previousInitialGridState = { columnCount, rowCount, state };
    }
  }

  function resetGridState() {
    const { columnCount, rowCount, state } = previousInitialGridState;
    if (generation) generation.value = 0;
    setGridState(columnCount, rowCount, state);
  }

  function getCellValue([x, y]: Coordinates) {
    return grid.value[x][y];
  }

  function setCellValue([x, y]: Coordinates, value = true) {
    grid.value[x][y] = value;
  }

  return { setGridState, resetGridState, setCellValue, getCellValue, getGridState };
};
