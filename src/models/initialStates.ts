import type { Coordinates } from '@/types/grid';
import anchorSymmetry from '@/assets/data/grid-states/Anchor-Symmetry.json';
import cmcFloat from '@/assets/data/grid-states/CMC-Float.json';
import totemOscillator from '@/assets/data/grid-states/Totem-Oscillator.json';
import war from '@/assets/data/grid-states/War.json';

export default {
  anchorSymmetry: {
    label: 'Anchor-Symmetry',
    state: anchorSymmetry as Coordinates[],
  },
  cmcFloat: {
    label: 'CMC-Float',
    state: cmcFloat as Coordinates[],
  },
  totemOscillator: {
    label: 'Totem-Oscillator',
    state: totemOscillator as Coordinates[],
  },
  war: {
    label: 'War',
    state: war as Coordinates[],
  },
};
