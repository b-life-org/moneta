import { Moneta } from "../mod.ts";
import { transformScale } from "./transformScale.ts";

export type NormalizeScaleParams = readonly [
    monetaObjects: ReadonlyArray<Moneta>
  ];

export const normalizeScale = (
    ...[monetaObjects]: NormalizeScaleParams
  ) =>{
    const highestScale = monetaObjects.reduce((highest, current) => {
      return Math.max(highest, current.scale);
    }, 0);

    return monetaObjects.map((d) => {
      const scale  = d.scale;

      return scale !== highestScale
        ? transformScale(d, highestScale)
        : d;
    });
  };