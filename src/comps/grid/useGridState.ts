import type { Ref, ComputedRef } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';
import { ref, computed } from 'vue';

const initialGridState = ref<Coordinates[]>([]);

const createCoordinateWrapper =
  (columnCount: number, rowCount: number) =>
  ([x, y]: Coordinates): Coordinates =>
    [x < 0 ? columnCount + x : x % columnCount, y < 0 ? rowCount + y : y % rowCount];

export default (grid: Ref<Grid>, generation?: Ref<number>) => {
  const coordinateWrapper = computed(() =>
    !grid.value.length
      ? (coords: Coordinates) => coords
      : createCoordinateWrapper(grid.value.length, grid.value[0].length)
  );

  function createGrid(columnCount: number, rowCount: number, state: Coordinates[] = []) {
    grid.value = Array.from(Array(columnCount), () => Array.from(Array(rowCount), () => false));
    setGridState(state);
  }

  function clearGrid() {
    grid.value = grid.value.map(columns => columns.map(() => false));
  }

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

  function setGridState(state: Coordinates[] = []) {
    const [cx, cy] = [Math.floor(grid.value.length * 0.5), Math.floor(grid.value[0].length * 0.5)];
    clearGrid();
    state.forEach(([rx, ry]) => setCellValue(wrapCoordinates([cx + rx, cy + ry]), true));
  }

  function resetGridState() {
    if (generation) generation.value = 0;
    setGridState(initialGridState.value);
  }

  function getCellValue([x, y]: Coordinates) {
    return grid.value[x][y];
  }

  function setCellValue([x, y]: Coordinates, value = true) {
    grid.value[x][y] = value;
  }

  function wrapCoordinates(coords: Coordinates) {
    return coordinateWrapper.value(coords);
  }

  function saveInitialState() {
    initialGridState.value = getGridState();
  }

  return {
    saveInitialState,
    createGrid,
    clearGrid,
    setGridState,
    resetGridState,
    setCellValue,
    getCellValue,
    getGridState,
    wrapCoordinates,
  };
};
