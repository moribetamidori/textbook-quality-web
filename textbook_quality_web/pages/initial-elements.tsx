import React from "react";
import { MarkerType, Position } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "generate",
    data: {
      label: "Input Node",
    },
    position: { x: 250, y: 0 },
  },

  {
    id: "2",
    type: "augment",
    data: {
      label: "Augment Node",
    },
    position: { x: 600, y: 0},
  },

  {
    id: "3",
    type: "textbook",
    data: {
      label: "Textbook Node",
    },
    position: { x: 900, y: 0 },
  },
];

export const edges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },

];
