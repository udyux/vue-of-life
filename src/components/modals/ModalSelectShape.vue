<template>
  <Modal @close="emit('close')">
    <p>Select a shape to place.</p>

    <section class="shapes">
      <article class="shapes__option" :class="{ '-selected': selectedShape === null }" @click="selectedShape = null">
        <p>Single cell (draw)</p>
        <ShapeGrid class="shapes__grid" :shape="[[0, 0]]" />
      </article>
    </section>

    <template v-for="({ label, shapes }, sectionKey) in shapeLists" :key="sectionKey">
      <button class="shapes__header" @click="toggleSection(sectionKey)">
        <span>{{ label }}</span>
        <i v-if="shapeSections[sectionKey]">&times;</i>
        <i v-else>+</i>
      </button>

      <Collapsible :is-open="shapeSections[sectionKey]" content-class="shapes" content-tag="section">
        <article
          v-for="(shape, key) in shapes"
          :key="key"
          class="shapes__option"
          :class="{ '-selected': isSelectedShape(key) }"
          @click="setSelectedShape(key, shape)"
        >
          <p>{{ shape.label }}</p>
          <ShapeGrid class="shapes__grid" :shape="shape.state" />
        </article>
      </Collapsible>
    </template>

    <footer class="modal__footer">
      <button class="modal__button button" @click="emit('close')">Cancel</button>
      <button class="modal__button button" @click="onSave">Select</button>
    </footer>
  </Modal>
</template>

<script setup lang="ts">
import type { Coordinates } from '@/types/grid';
import { ref, reactive } from 'vue';
import * as shapeLists from '@/models/shapes';
import { useGridShape } from '@/comps';
import { ShapeGrid } from '../grids';
import { Collapsible, Modal } from '../layout';

type Shape = { label: string; state: Coordinates[] };
type ShapeWithKey = { key: string } & Shape;

const { activeShape } = useGridShape();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const shapeSections = reactive<Record<string, boolean>>(
  Object.keys(shapeLists).reduce((shapeListMap, key) => ({ ...shapeListMap, [key]: false }), {})
);

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

function toggleSection(sectionKey: string) {
  shapeSections[sectionKey] = !shapeSections[sectionKey];
}
</script>
