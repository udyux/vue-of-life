<template>
  <div class="input-select">
    <span v-if="label" class="input-select__label">
      {{ label }}
    </span>

    <div class="input-select__field" @click.stop>
      <button class="input-select__placeholder" @click="onClickLabel">
        {{ selectedLabel || modelValue || placeholder || '' }}
        <span class="input-select__indicator" :class="{ '-close': isOpen }" />
      </button>

      <Collapsible :is-open="isOpen" class="input-select__tray" @close-transition-end="onMenuClose">
        <div ref="optionsMenuNode" class="input-select__menu">
          <menu>
            <li v-for="opt in options" :key="opt.value" class="input-select__entry">
              <button
                class="input-select__option"
                :class="{ '-selected': isOptionSelected(opt.value) }"
                @click="setSelection(opt.value)"
              >
                <span class="input-select__check" />
                {{ opt.label || opt.value }}
              </button>
            </li>
          </menu>
        </div>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import SimpleBar from 'simplebar';
import { Collapsible } from '../layout';
import { eventBus } from '@/utils';

enum SelectEvents {
  Open = 'select:open',
}

type Props = {
  modelValue: string | number | null;
  options: { label?: string; value: string | number }[];
  label?: string | null;
  placeholder?: string | null;
  isOpenOnMount?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  label: null,
  placeholder: null,
  isOpenOnMount: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void;
}>();

const isOpen = ref(props.isOpenOnMount);
const optionsMenuNode = ref<HTMLDivElement | null>(null);
const simplebarInstance = ref<SimpleBar | null>(null);

const selectedLabel = computed(() => props.options.find(({ value }) => value === props.modelValue)?.label);

watch(isOpen, (newValue: boolean, oldValue: boolean) => {
  if (newValue === oldValue) return;

  if (newValue) {
    document.body.addEventListener('click', closeMenu);
    eventBus.on(SelectEvents.Open, closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
    eventBus.off(SelectEvents.Open, closeMenu);
  }
});

onMounted(async () => {
  await nextTick();
  if (optionsMenuNode.value) simplebarInstance.value = new SimpleBar(optionsMenuNode.value);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('click', closeMenu);
  eventBus.off(SelectEvents.Open, closeMenu);
});

function setSelection(value: string | number | null) {
  emit('update:modelValue', value);
  closeMenu();
}

function isOptionSelected(value: string | number) {
  return props.modelValue === value;
}

function onClickLabel() {
  isOpen.value = !isOpen.value;
  eventBus.emit(SelectEvents.Open);
}

function closeMenu() {
  isOpen.value = false;
}

function onMenuClose() {
  if (simplebarInstance.value) simplebarInstance.value.getScrollElement().scrollTop = 0;
}
</script>
