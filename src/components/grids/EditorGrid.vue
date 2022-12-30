<template>
  <section class="grid -editor" @keyup="onKeyup" @mouseleave="onMouseLeave">
    <ul
      v-for="(column, x) in editorGrid"
      :key="x"
      class="grid__column"
      :class="{ '-center': x === centerColumn }"
      :style="{ '--cell-size': `${cellSize}px` }"
    >
      <li
        v-for="(isAlive, y) in column"
        :key="y"
        class="grid__cell"
        :class="{ '-alive': isAlive }"
        :style="{ '--cell-size': `${cellSize}px` }"
        @click="commitToEditor"
        @mouseenter="activeCell = [x, y]"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { Grid } from '@/types/grid';
import { KeyCode } from '@/types/keyboard-events';
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useGridEditor, useShape } from '@/comps';

const props = defineProps<{ grid: Ref<Grid>; cellSize: number }>();

const { editorGrid, createEditorGrid, commitToEditor } = useGridEditor(props.grid);
const { activeCell, mirrorShapeX, mirrorShapeY, rotateShape } = useShape();

const keyboardHandlers = {
  [KeyCode.X]: mirrorShapeX,
  [KeyCode.Y]: mirrorShapeY,
  [KeyCode.R]: rotateShape,
};

const centerColumn = computed(() => Math.floor(editorGrid.value.length * 0.5));

onMounted(() => {
  createEditorGrid();
  document.addEventListener('keyup', onKeyup);
});

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyup);
});

function onKeyup({ code }: KeyboardEvent) {
  if (keyboardHandlers[code as KeyCode]) keyboardHandlers[code as KeyCode]();
}

function onMouseLeave() {
  activeCell.value = null;
}
</script>
