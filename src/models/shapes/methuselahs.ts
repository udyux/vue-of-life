import type { ShapeList } from '@/types/shape-list';
import acorn from '@/assets/data/shapes/methuselahs/Acorn.json';
import bunnies from '@/assets/data/shapes/methuselahs/Bunnies.json';
import dieHard from '@/assets/data/shapes/methuselahs/Die-Hard.json';
import rPentomino from '@/assets/data/shapes/methuselahs/R-Pentomino.json';

type ShapeKeys = 'acorn' | 'bunnies' | 'dieHard' | 'rPentomino';

export default <ShapeList<ShapeKeys>>{
  label: 'Methuselahs',
  shapes: {
    rPentomino: {
      label: 'R-Pentomino',
      state: rPentomino,
    },
    acorn: {
      label: 'Acorn',
      state: acorn,
    },
    bunnies: {
      label: 'Bunnies',
      state: bunnies,
    },
    dieHard: {
      label: 'Die-Hard',
      state: dieHard,
    },
  },
};
