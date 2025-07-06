import React from "react";

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
    name: "Firm Ease",
    type: "physics",
    config: {
      mass: 1,
      stiffness: 220,
      damping: 30,
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
    name: "Quick Snap",
    type: "time",
    config: {
      bounce: 0.2,
      duration: 0.5,
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
];

export default presets;
