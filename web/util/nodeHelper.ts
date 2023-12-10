export const generateNodes = (numAugmentedAgents: number) => {
    const nodes = [
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
    ];
  
    const edges = [];
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