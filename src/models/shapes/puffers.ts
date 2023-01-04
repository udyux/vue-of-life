import type { ShapeList } from '@/types/shape-list';
import blockLayingSwitchEngine from '@/assets/data/shapes/puffers/Block-Laying-Switch-Engine.json';
import gliderProducingSwitchEngine from '@/assets/data/shapes/puffers/Glider-Producing-Switch-Engine.json';
import noahsArk from '@/assets/data/shapes/puffers/Noahs-Ark.json';

type ShapeKeys = 'blockLayingSwitchEngine' | 'gliderProducingSwitchEngine' | 'noahsArk';

export default <ShapeList<ShapeKeys>>{
  label: 'Puffers',
  shapes: {
    blockLayingSwitchEngine: {
      label: 'Block-Laying Switch-Engine',
      state: blockLayingSwitchEngine,
    },
    gliderProducingSwitchEngine: {
      label: 'Glider-Producing Switch-Engine',
      state: gliderProducingSwitchEngine,
    },
    noahsArk: {
      label: `Noah's Ark`,
      state: noahsArk,
    },
  },
};
