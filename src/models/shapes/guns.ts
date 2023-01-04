import type { ShapeList } from '@/types/shape-list';
import twinLauncher from '@/assets/data/shapes/guns/Twin-Launcher.json';
import gosperGliderGun from '@/assets/data/shapes/guns/Gosper-Glider-Gun.json';

export default <ShapeList<'twinLauncher' | 'gosperGliderGun'>>{
  label: 'Guns',
  shapes: {
    twinLauncher: {
      label: 'Twin-Launcher',
      state: twinLauncher,
    },
    gosperGliderGun: {
      label: 'Gosper-Glider-Gun',
      state: gosperGliderGun,
    },
  },
};
