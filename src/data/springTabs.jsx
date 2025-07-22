const springTabs = [
  {
    springType: "Physics",
    key: "physics",
    languages: ["Motion", "SwiftUI"],
    fields: [
      {
        name: "Mass",
        key: "mass",
        max: 10,
        min: 0.1,
        step: 0.01,
      },
      {
        name: "Stiffness",
        key: "stiffness",
        max: 1000,
        min: 1,
        step: 0.1,
      },
      {
        name: "Damping",
        key: "damping",
        max: 100,
        min: 1,
        step: 0.1,
      },
    ],
  },
  {
    springType: "Time",
    key: "time",
    languages: ["Motion", "SwiftUI"],
    fields: [
      {
        name: "Bounce",
        key: "bounce",
        max: 1,
        min: 0.01,
        step: 0.01,
      },
      {
        name: "Duration",
        key: "duration",
        max: 10,
        min: 0.01,
        step: 0.01,
      },
    ],
  },
];

export default springTabs;
