import type { Ref } from 'vue';
import type { Grid, Coordinates } from '@/types/grid';
import { ref, computed } from 'vue';
import useGridState from './useGridState';

const editorGrid = ref<Grid>([]);
const activeCell = ref<Coordinates | null>(null);
const activeShape = ref<Coordinates[] | null>(null);

const editorState = useGridState(editorGrid);
const { wrapCoordinates } = editorState;

const computedEditorGrid = computed<Grid>(() => {
  if (!editorGrid.value.length) return editorGrid.value;
  const currentEditorGrid = Array.from(editorGrid.value, column => Array.from(column));

  if (activeCell.value && activeShape.value) {
    const [cx, cy] = activeCell.value;

    activeShape.value
      .map(([rx, ry]) => wrapCoordinates([cx + rx, cy + ry]))
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

  function mirrorShapeX() {
    if (!activeShape.value) return;
    activeShape.value = activeShape.value.map(([x, y]) => [x * -1, y]);
  }

  function mirrorShapeY() {
    if (!activeShape.value) return;
    activeShape.value = activeShape.value.map(([x, y]) => [x, y * -1]);
  }

  function rotateShape() {
    if (!activeShape.value) return;
    activeShape.value = activeShape.value.map(([x, y]) => [y * -1, x]);
  }

  function createEditorGrid() {
    editorState.createGrid(columnCount, rowCount, [], true);
  }

  function commitToEditor() {
    editorState.setGridState(editorState.getGridState(computedEditorGrid));
  }

  async function commitToGrid() {
    return await new Promise<void>(resolve => {
      gameState.setGridState([...gameState.getGridState(), ...editorState.getGridState()], true);
      activeCell.value = null;
      activeShape.value = null;
      editorState.clearGrid();
      resolve();
    });
  }

  return {
    editorGrid: computedEditorGrid,
    activeCell,
    activeShape,
    mirrorShapeX,
    mirrorShapeY,
    rotateShape,
    createEditorGrid,
    commitToEditor,
    commitToGrid,
  };
};
