<template>
  <Teleport to="#modals">
    <div class="modal" @click="emit('close')">
      <div class="modal__body" @click.stop>
        <p>Paste an exported grid state to import.</p>
        <textarea v-model="jsonState" class="import"></textarea>

        <div class="modal__footer">
          <button class="modal__button button" @click="emit('close')">Cancel</button>
          <button class="modal__button button" @click="onImport">Import</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGrid } from '@/comps';

const { setGridState } = useGrid();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const jsonState = ref('');
const error = ref<unknown | null>(null);

function onImport() {
  try {
    setGridState(JSON.parse(jsonState.value));
    emit('close');
  } catch (e) {
    error.value = e;
    console.error(e);
  }
}
</script>
