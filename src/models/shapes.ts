import type { Coordinates } from '@/types/grid';
import rPentomino from '@/assets/data/shapes/R-Pentomino.json';
import twinLauncher from '@/assets/data/shapes/Twin-Launcher.json';

export default {
  rPentomino: {
    label: 'R-Pentomino',
    state: rPentomino as Coordinates[],
  },
  twinLauncher: {
    label: 'Twin-Launcher',
    state: twinLauncher as Coordinates[],
  },
};
