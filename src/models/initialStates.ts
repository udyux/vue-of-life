import anchorSymmetry from '@/assets/data/Anchor-Symmetry.json';
import cmcFloat from '@/assets/data/CMC-Float.json';
import oPositive from '@/assets/data/O-Positive.json';
import rPentomino from '@/assets/data/R-Pentomino.json';
import twinLauncher from '@/assets/data/Twin-Launcher.json';
import type { Coordinates } from '@/types/grid';

export const initialStates = {
  rPentomino: {
    label: 'R-Pentomino',
    state: rPentomino as Coordinates[],
  },
  oPositive: {
    label: 'O-Positive',
    state: oPositive as Coordinates[],
  },
  anchorSymmetry: {
    label: 'Anchor-Symmetry',
    state: anchorSymmetry as Coordinates[],
  },
  cmcFloat: {
    label: 'CMC-Float',
    state: cmcFloat as Coordinates[],
  },
  twinLauncher: {
    label: 'Twin-Launcher',
    state: twinLauncher as Coordinates[],
  },
};

export const defaultInitialState = initialStates.rPentomino;
