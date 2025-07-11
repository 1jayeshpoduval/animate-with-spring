const presets = [
  {
    name: "Soft Pop",
    type: "physics",
    config: {
      mass: 1,
      stiffness: 188,
      damping: 23,
    },
  },
  {
    name: "Quick Back",
    type: "time",
    config: {
      bounce: 0.2,
      duration: 0.5,
    },
  },
  {
    name: "Firm Ease",
    type: "physics",
    config: {
      mass: 1,
      stiffness: 220,
      damping: 30,
    },
  },
  {
    name: "Zip",
    type: "physics",
    config: {
      mass: 0.75,
      stiffness: 160,
      damping: 20,
    },
  },
  {
    name: "Zoop",
    type: "physics",
    config: {
      mass: 1,
      stiffness: 300,
      damping: 35,
    },
  },
  {
    name: "Gentle",
    type: "time",
    config: {
      bounce: 0.27,
      duration: 0.7,
    },
  },
  {
    name: "Hard Drift",
    type: "physics",
    config: {
      mass: 1,
      stiffness: 310,
      damping: 42,
    },
  },
  {
    name: "Slow Drift",
    type: "physics",
    config: {
      mass: 2.5,
      stiffness: 180,
      damping: 37,
    },
  },
];

export default presets;
