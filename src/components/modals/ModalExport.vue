<template>
  <Teleport to="#modals">
    <div class="modal" @click="emit('close')">
      <div class="modal__body" @click.stop>
        <p>Copy and save this JSON code to import later.</p>
        <code class="export">{{ jsonState }}</code>

        <footer class="modal__footer">
          <button class="modal__button button" @click="copyToClipboard">Copy</button>
          <button class="modal__button button" @click="emit('close')">Done</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGrid } from '@/comps';

const { getGridState } = useGrid();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const jsonState = computed(() => JSON.stringify(getGridState()));

function copyToClipboard() {
  navigator.clipboard.writeText(jsonState.value);
}
</script>
