const springFactors = [
  {
    factorName: "Duration",
    description:
      "A tasteful spring animation respects a user’s time. It feels quick but never rushed. As a rule of thumb, keep most of your spring animations within 150–350ms. Few exceptions apply, however no spring animation (or any UI animation) should be over 700ms. It makes your interface feel slow.",
    key: "duration",

    tasteless: {
      key: "tasteless",
      mass: 2,
      stiffness: 50,
      damping: 23,
      toggle: false,
    },
    tasteful: {
      key: "tasteful",
      mass: 1,
      stiffness: 135,
      damping: 21,
      toggle: false,
    },
  },
  {
    factorName: "Bounce",
    description:
      "Bounce should match the physical weight of what’s moving. Too much bounce feels cartoonish, like the interface is made of jelly (unless you want your brand's tone to convey that). Sometimes the best spring animations are the ones with no bounce.",
    key: "bounce",
    tasteless: {
      key: "tasteless",
      mass: 1.25,
      stiffness: 160,
      damping: 12,
      toggle: false,
    },
    tasteful: {
      key: "tasteful",
      mass: 1,
      stiffness: 190,
      damping: 23,
      toggle: false,
    },
  },
  {
    factorName: "Velocity",
    description:
      "High velocity can make an element feel snappy and intentional, but if not done well, it comes across as erratic. Even if the bounce is small, a high velocity can make the animation feel aggressive or out of control. Lower velocity is smoother, but again, risks feeling sluggish if not done well.",
    key: "velocity",
    tasteless: {
      key: "tasteless",
      mass: 1,
      stiffness: 800,
      damping: 35,
      toggle: false,
    },
    tasteful: {
      key: "tasteful",
      mass: 1,
      stiffness: 400,
      damping: 34,
      toggle: false,
    },
  },
  {
    factorName: "Settling Time",
    description:
      "Even if a spring animation looks done, it might still be technically in motion. A well-tuned spring animation feels complete at the right moment which is usually when the user no longer needs to pay attention to it.",
    key: "settlingTime",
    tasteless: {
      key: "tasteless",
      mass: 1,
      stiffness: 180,
      damping: 60,
      toggle: false,
    },
    tasteful: {
      key: "tasteful",
      mass: 1,
      stiffness: 460,
      damping: 60,
      toggle: false,
    },
  },
  {
    factorName: "Context Awareness",
    description:
      "Not all spring animations should be created equally. A tooltip animation should feel different from a modal animation. A tasteful spring animation matches the context of the element being animated. It takes into account its size, purpose, and weight.",
    key: "contextAwareness",
    tasteless: {
      mass: 2.2,
      stiffness: 130,
      damping: 8,
      toggle: false,
    },
    tasteful: {
      mass: 2.2,
      stiffness: 130,
      damping: 8,
      toggle: false,
    },
  },
];

export default springFactors;
