import { ref } from 'vue';
import useGenerationIterator from './useGenerationIterator';
import useGridState from './useGridState';
import type { Grid } from '@/types/grid';

const grid = ref<Grid>([]);
const generation = ref(0);
const isRunning = ref(false);
const isEditing = ref(false);

export default () => {
  const { timing, startIterations } = useGenerationIterator(grid, generation, isRunning);
  const { createGrid, clearGrid, setGridState, resetGridState, getGridState, setCellValue } = useGridState(
    grid,
    generation
  );

  function togglePlay() {
    isRunning.value = !isRunning.value;
    if (!isRunning.value) return;
    console.log(`Generation: ${generation.value}`);
    console.log(JSON.stringify(getGridState()));
    startIterations();
  }

  function toggleEditor() {
    isRunning.value = false;
    isEditing.value = !isEditing.value;
  }

  return {
    generation,
    timing,
    grid,
    isRunning,
    isEditing,
    togglePlay,
    toggleEditor,
    createGrid,
    clearGrid,
    getGridState,
    setGridState,
    resetGridState,
    setCellValue,
  };
};
