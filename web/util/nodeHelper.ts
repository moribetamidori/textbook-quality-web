export const generateNodes = (numAugmentedAgents: number) => {
  const nodes = [
    {
      id: "-1",
      type: "subject",
      data: {
        label: "Subject Node",
      },
      position: { x: -100, y: -100 },
    },
    {
      id: "0",
      type: "start",
      data: {
        label: "Start Node",
      },
      position: { x: -20, y: 100 },
    },
    {
      id: "1",
      type: "generate",
      data: {
        label: "Input Node",
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "3",
      type: "textbook",
      data: {
        label: "Textbook Node",
      },
      position: { x: 900, y: 0 },
    },
    {
      id: "4",
      type: "download",
      data: {
        label: "Download Node",
      },
      position: { x: 1250, y: 0 },
    },
  ];

  const edges = [
    {
      id: "e0-1",
      source: "0",
      target: "1",
      animated: false,
      style: { stroke: "#FFBFF1", strokeWidth: 2 },
    },
    {
      id: "e-1-1",
      source: "-1",
      target: "1",
      animated: false,
      style: { stroke: "#5174ED", strokeWidth: 2 },
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      animated: false,
      style: { stroke: "#FF9A3D", strokeWidth: 2 },
    }
  ];

  for (let i = 0; i < numAugmentedAgents; i++) {
    nodes.push({
      id: `2-${i}`,
      type: "augment",
      data: {
        label: `${i}`,
      },
      position: { x: 600, y: i * 100 },
    });
    edges.push({
      id: `e1-2-${i}`,
      source: "1",
      target: `2-${i}`,
      animated: false,
      style: { stroke: "#00ff00", strokeWidth: 2 },
    });
    edges.push({
      id: `e2-${i}-3`,
      source: `2-${i}`,
      target: "3",
      animated: false,
      style: { stroke: "#9F59FF", strokeWidth: 2 },
    });
  }

  return { nodes, edges };
};
