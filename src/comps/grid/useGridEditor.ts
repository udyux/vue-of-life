import type { Ref } from 'vue';
import type { Grid } from '@/types/grid';
import { ref, computed } from 'vue';
import useGridState from './useGridState';
import useGridShape from './useGridShape';

const editorGrid = ref<Grid>([]);
const { activeCell, activeShape } = useGridShape();

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

  function createEditorGrid() {
    editorState.createGrid(columnCount, rowCount, []);
  }

  function commitToEditor() {
    editorState.setGridState(editorState.getGridState(computedEditorGrid));
  }

  async function commitToGrid() {
    return await new Promise<void>(resolve => {
      gameState.setGridState([...gameState.getGridState(), ...editorState.getGridState()]);
      activeCell.value = null;
      activeShape.value = null;
      editorState.clearGrid();
      resolve();
    });
  }

  return {
    editorGrid: computedEditorGrid,
    createEditorGrid,
    commitToEditor,
    commitToGrid,
  };
};
