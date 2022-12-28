import type { Coordinates } from '@/types/grid';
import anchorSymmetry from '@/assets/data/grid-states/Anchor-Symmetry.json';
import cmcFloat from '@/assets/data/grid-states/CMC-Float.json';

export default {
  anchorSymmetry: {
    label: 'Anchor-Symmetry',
    state: anchorSymmetry as Coordinates[],
  },
  cmcFloat: {
    label: 'CMC-Float',
    state: cmcFloat as Coordinates[],
  },
};
