import type { ShapeList } from '@/types/shape-list';
import boat from '@/assets/data/shapes/stills/Boat.json';
import loaf from '@/assets/data/shapes/stills/Loaf.json';
import longShip1 from '@/assets/data/shapes/stills/Long-Ship-1.json';
import longShip2 from '@/assets/data/shapes/stills/Long-Ship-2.json';
import longShip3 from '@/assets/data/shapes/stills/Long-Ship-3.json';
import longShip4 from '@/assets/data/shapes/stills/Long-Ship-4.json';
import ship from '@/assets/data/shapes/stills/Ship.json';
import square from '@/assets/data/shapes/stills/Square.json';

type ShapeKeys = 'boat' | 'loaf' | 'longShip1' | 'longShip2' | 'longShip3' | 'longShip4' | 'ship' | 'square';

export default <ShapeList<ShapeKeys>>{
  label: 'Stills',
  shapes: {
    boat: {
      label: 'Boat',
      state: boat,
    },
    loaf: {
      label: 'Loaf',
      state: loaf,
    },
    longShip1: {
      label: 'Long-Ship 1',
      state: longShip1,
    },
    longShip2: {
      label: 'Long-Ship 2',
      state: longShip2,
    },
    longShip3: {
      label: 'Long-Ship 3',
      state: longShip3,
    },
    longShip4: {
      label: 'Long-Ship 4',
      state: longShip4,
    },
    ship: {
      label: 'Ship',
      state: ship,
    },
    square: {
      label: 'Square',
      state: square,
    },
  },
};
