import type { ShapeList } from '@/types/shape-list';
import copperhead from '@/assets/data/shapes/spaceships/Copperhead.json';
import glider from '@/assets/data/shapes/spaceships/Glider.json';
import walker from '@/assets/data/shapes/spaceships/Walker.json';

type ShapeKeys = 'copperhead' | 'glider' | 'walker';

export default <ShapeList<ShapeKeys>>{
  label: 'Spaceships',
  shapes: {
    copperhead: {
      label: 'Copperhead',
      state: copperhead,
    },
    glider: {
      label: 'Glider',
      state: glider,
    },
    walker: {
      label: 'Walker',
      state: walker,
    },
  },
};
