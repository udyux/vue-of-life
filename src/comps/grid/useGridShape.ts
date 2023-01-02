import type { Coordinates } from '@/types/grid';
import { ref } from 'vue';

const activeCell = ref<Coordinates | null>(null);
const activeShape = ref<Coordinates[] | null>(null);

export default () => {
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

  return {
    activeCell,
    activeShape,
    mirrorShapeX,
    mirrorShapeY,
    rotateShape,
  };
};
