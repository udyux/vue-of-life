import { ref } from 'vue';
import useGenerationIterator from './useGenerationIterator';
import useGridState from './useGridState';
import type { Grid } from '@/types/grid';

const grid = ref<Grid>([]);
const generation = ref(0);
const isRunning = ref(false);

export default () => {
  const { startIterations } = useGenerationIterator(grid, generation, isRunning);
  const { setGridState, resetGridState, getCurrentState, setCellValue } = useGridState(grid, generation);

  function logState() {
    console.log(`Generation: ${generation.value}`);
    console.log(JSON.stringify(getCurrentState()));
  }

  function togglePlay() {
    isRunning.value = !isRunning.value;
    if (!isRunning.value) return;
    logState();
    startIterations();
  }

  return { generation, grid, isRunning, togglePlay, logState, setGridState, resetGridState, setCellValue };
};
