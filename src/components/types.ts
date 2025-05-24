import type { Position } from "geojson";

export type MapContextMenuEvent = {
  x: number;
  y: number;
  position: Position;
  zoomLevel?: number;
};
