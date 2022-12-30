<template>
  <Teleport to="#modals">
    <div class="modal" @click="emit('close')">
      <div class="modal__body" @click.stop>
        <p>Select a shape to place.</p>

        <ul class="shapes">
          <li class="shapes__option" :class="{ '-selected': selectedShape === null }" @click="selectedShape = null">
            <p>Single cell (draw)</p>
            <ShapeGrid class="shapes__grid" :shape="[[0, 0]]" />
          </li>

          <li
            v-for="(shape, key) in shapes"
            :key="key"
            class="shapes__option"
            :class="{ '-selected': isSelectedShape(key) }"
            @click="setSelectedShape(key, shape)"
          >
            <p>{{ shape.label }}</p>
            <ShapeGrid class="shapes__grid" :shape="shape.state" />
          </li>
        </ul>

        <footer class="modal__footer">
          <button class="modal__button button" @click="emit('close')">Cancel</button>
          <button class="modal__button button" @click="onSave">Select</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Coordinates } from '@/types/grid';
import { ref } from 'vue';
import { shapes } from '@/models';
import { useShape } from '@/comps';
import { ShapeGrid } from '../grids';

type Shape = { label: string; state: Coordinates[] };
type ShapeWithKey = { key: string } & Shape;

const { activeShape } = useShape();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const selectedShape = ref<ShapeWithKey | null>(null);

function setSelectedShape(key: string, shape: Shape) {
  selectedShape.value = { key, ...shape };
}

function isSelectedShape(key: string) {
  return selectedShape.value?.key === key;
}

function onSave() {
  activeShape.value = selectedShape.value?.state || null;
  emit('close');
}
</script>
