import type { Coordinates } from './grid';

type Shape = {
  label: string;
  state: Coordinates[];
};

export type ShapeList<K extends string> = {
  label: string;
  shapes: Record<K, Shape>;
};
