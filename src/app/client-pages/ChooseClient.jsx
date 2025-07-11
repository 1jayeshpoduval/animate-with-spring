"use client";
import React from "react";
import Container from "@/components/Container";
import { motion } from "motion/react";
import presets from "@/data/presets";
import { useRef, useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { toast } from "sonner";

const ChooseClient = () => {
  const [ballTravelDistance, setBallTravelDistance] = useState(0);
  const dottedLineRef = useRef();
  const windowSize = useWindowSize(); // Dynamic window resize hook

  const [hovered, setHovered] = useState("");

  const handleHoveredAnimation = (animationName) => {
    const hoveredAnimation = presets.find(
      (preset) => preset.name === animationName,
    );
    setHovered(hoveredAnimation);
  };

  // Copy transition code to clipboard
  const handleCodeCopy = async (preset) => {
    let code = "";
    if (preset.type === "physics") {
      code = `transition={{
              type: 'spring',
              mass: ${preset.config.mass},
              stiffness: ${preset.config.stiffness},
              damping: ${preset.config.damping},
           }}`;
    } else {
      code = `transition={{
              type: 'spring',
              bounce: ${preset.config.bounce},
              duration: ${preset.config.duration}, 
            }}`;
    }
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error(error.message);
    }
    toast.custom((t) => (
      <div className="bg-secondary text-primary-foreground relative flex w-[360px] items-center justify-between rounded-[12px] p-3 text-sm">
        <span className="font-sans">Spring transition property copied!</span>
        <button
          className="items-cente bg-primary-foreground flex cursor-pointer justify-center rounded-[6px] px-2 py-1 select-none"
          onClick={() => toast.dismiss(t)}
        >
          <span className="text-primary font-sans font-medium">Close</span>
        </button>
      </div>
    ));
  };

  // Dynamically update ballTravelDistance on window resize
  useEffect(() => {
    if (dottedLineRef.current) {
      const { width } = dottedLineRef.current.getBoundingClientRect(); // Get the width of the dotted line ref
      setBallTravelDistance(width);
    }
  }, [windowSize.width]);

  return (
    <main>
      <section className="py-4">
        <Container className="@container/Choose">
          <h1 className="font-sans text-2xl font-semibold tracking-tight @md/Choose:max-w-[30ch]">
            The best hand curated spring presets.
          </h1>
          <div className="mt-8 grid grid-cols-4 gap-8 pb-32 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="col-span-4 flex cursor-pointer flex-col gap-2 select-none"
                onPointerEnter={() => handleHoveredAnimation(preset.name)}
                onPointerLeave={() => setHovered("")}
                onClick={() => handleCodeCopy(preset)}
              >
                <motion.div
                  className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-neutral-50"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                    ref={dottedLineRef}
                  >
                    <motion.div
                      key={
                        hovered.name === preset.name
                          ? `active-${preset.name}`
                          : `inactive-${preset.name}`
                      } // Force recreate element on hover in and out. This ensures Motion doesn't keep the last animated position in memory and resumes from there
                      className={`absolute top-1/2 size-8 -translate-[16px] rounded-full ${
                        hovered.name === preset.name
                          ? "bg-secondary"
                          : "bg-transparent"
                      }`}
                      initial={{ x: 0 }}
                      animate={{
                        x:
                          hovered.name === preset.name ? ballTravelDistance : 0,
                      }} // Animate the ball to the width of the dotted line
                      transition={
                        preset.type === "time"
                          ? {
                              type: "spring",
                              duration: `${preset.config.duration}`,
                              bounce: `${preset.config.bounce}`,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }
                          : {
                              type: "spring",
                              stiffness: `${preset.config.stiffness}`,
                              damping: `${preset.config.damping}`,
                              mass: `${preset.config.mass}`,
                              repeat: Infinity,
                              repeatType: "mirror",
                            }
                      }
                    ></motion.div>
                  </div>
                  {hovered.name === preset.name && (
                    <motion.div
                      className="absolute right-12 bottom-0 left-0 flex w-full items-end justify-between p-6"
                      initial={{ opacity: 0.5, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.1,
                      }}
                    >
                      <span className="text-primary/50 font-sans text-sm font-medium">
                        {preset.name}
                      </span>
                      <div className="flex flex-col">
                        {preset.config.mass && (
                          <div className="flex gap-1">
                            <span className="text-primary/50 font-sans text-sm font-medium">
                              M:
                            </span>
                            <span className="text-primary/50 font-sans text-sm font-bold">
                              {preset.config.mass}
                            </span>
                          </div>
                        )}
                        {preset.config.stiffness && (
                          <div className="flex gap-1">
                            <span className="text-primary/50 font-sans text-sm font-medium">
                              S:
                            </span>
                            <span className="text-primary/50 font-sans text-sm font-bold">
                              {preset.config.stiffness}
                            </span>
                          </div>
                        )}
                        {preset.config.damping && (
                          <div className="flex gap-1">
                            <span className="text-primary/50 font-sans text-sm font-medium">
                              D:
                            </span>
                            <span className="text-primary/50 font-sans text-sm font-bold">
                              {preset.config.damping}
                            </span>
                          </div>
                        )}
                        {preset.config.bounce && (
                          <div className="flex gap-1">
                            <span className="text-primary/50 font-sans text-sm font-medium">
                              B:
                            </span>
                            <span className="text-primary/50 font-sans text-sm font-bold">
                              {preset.config.bounce}
                            </span>
                          </div>
                        )}
                        {preset.config.duration && (
                          <div className="flex gap-1">
                            <span className="text-primary/50 font-sans text-sm font-medium">
                              D:
                            </span>
                            <span className="text-primary/50 font-sans text-sm font-bold">
                              {preset.config.duration}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
          {/* <motion.div
            className="size-8 bg-red-300 rounded-lg"
            initial={{ x: 0, rotate: 0 }}
            animate={{
              x: 300,
            }}
            transition={{
              type: "spring",
              mass: 1,
              stiffness: 310,
              damping: 42,
              bounce: 0.27,
              duration: 0.7,

              repeat: Infinity,
              repeatType: "mirror",
            }}
          ></motion.div> */}
        </Container>
      </section>
    </main>
  );
};

export default ChooseClient;
