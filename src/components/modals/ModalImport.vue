<template>
  <Teleport to="#modals">
    <div class="modal" @click="emit('close')">
      <div class="modal__body" @click.stop="eventBus.emit(GlobalSelectEvents.Close)">
        <header class="modal__header">
          <p>Paste an exported grid state to import or select one from the dropdown.</p>
          <InputSelect class="modal__input" v-model="preset" :options="presets" />
        </header>

        <textarea v-model="jsonState" class="import"></textarea>

        <footer class="modal__footer">
          <button class="modal__button button" @click="emit('close')">Cancel</button>
          <button class="modal__button button" @click="onImport">Import</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { GlobalSelectEvents } from '@/types/global-events';
import { ref, watch } from 'vue';
import { useGrid } from '@/comps';
import { initialStates } from '@/models';
import { eventBus } from '@/utils';
import { InputSelect } from '../inputs';

const { setGridState } = useGrid();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const jsonState = ref('');
const preset = ref<string | null>(null);
const error = ref<unknown | null>(null);

const presets = Object.values(initialStates).map(({ label, state }) => ({ label, value: JSON.stringify(state) }));

watch(preset, value => {
  if (!value) return;
  jsonState.value = value;
  preset.value = null;
});

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
