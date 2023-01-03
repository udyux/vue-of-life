<template>
  <Teleport to="#modals">
    <Transition name="modal" mode="out-in" appear>
      <div class="modal" @click="emit('close')">
        <div class="modal__body" @click.stop="bodyClickHandler">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type Props = { bodyClickHandler?: () => void };

withDefaults(defineProps<Props>(), { bodyClickHandler: () => void 0 });

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>
