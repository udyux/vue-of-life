import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';
import { ref, computed } from 'vue';
import useGridState from './useGridState';

const editorGrid = ref<Grid>([]);
const activeCell = ref<Coordinates | null>(null);
const activeShape = ref<Coordinates[] | null>(null);

const computedEditorGrid = computed<Grid>(() => {
  if (!editorGrid.value.length) return editorGrid.value;
  const currentEditorGrid = Array.from(editorGrid.value, column => Array.from(column));
  const columnCount = currentEditorGrid.length;
  const rowCount = currentEditorGrid[0].length;

  if (activeCell.value && activeShape.value) {
    const [cx, cy] = activeCell.value;

    activeShape.value
      .map<Coordinates>(([rx, ry]) => {
        const xRaw = cx + rx;
        const yRaw = cy + ry;
        const x = xRaw < 0 ? columnCount + xRaw : xRaw % columnCount;
        const y = yRaw < 0 ? rowCount + yRaw : yRaw % rowCount;
        if (xRaw < 0) console.log({ xRaw, x, columnCount });
        return [x, y];
      })
      .forEach(([x, y]) => {
        currentEditorGrid[x][y] = true;
      });
  } else if (activeCell.value) {
    const [cx, cy] = activeCell.value;
    currentEditorGrid[cx][cy] = true;
  }

  return currentEditorGrid;
});

export default (grid: Ref<Grid>) => {
  const columnCount = grid.value.length;
  const rowCount = grid.value[0].length;
  const gameState = useGridState(grid);
  const editorState = useGridState(editorGrid);

  function mirrorShapeX() {
    if (!activeShape.value) return;
    activeShape.value = activeShape.value.map(([x, y]) => [x * -1, y]);
  }

  function mirrorShapeY() {
    if (!activeShape.value) return;
    activeShape.value = activeShape.value.map(([x, y]) => [x, y * -1]);
  }

  function createEditorGrid() {
    editorState.setGridState(columnCount, rowCount, [], true);
  }

  function commitToEditor() {
    editorState.setGridState(columnCount, rowCount, editorState.getGridState(computedEditorGrid), true);
  }

  async function commitToGrid() {
    return await new Promise<void>(resolve => {
      gameState.setGridState(columnCount, rowCount, [...gameState.getGridState(), ...editorState.getGridState()]);
      activeCell.value = null;
      activeShape.value = null;
      createEditorGrid();
      resolve();
    });
  }

  return {
    editorGrid: computedEditorGrid,
    activeCell,
    activeShape,
    mirrorShapeX,
    mirrorShapeY,
    createEditorGrid,
    commitToEditor,
    commitToGrid,
  };
};
