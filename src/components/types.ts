import type { Position } from "geojson";

export type MapContextMenuEvent = {
  x: number;
  y: number;
  position: Position;
  zoomLevel?: number;
  units?: {
    id?: string;
    sidc?: string;
    label?: string;
  }[];
  equipment?: {
    id?: string;
    sidc?: string;
    label?: string;
  }[];
};
