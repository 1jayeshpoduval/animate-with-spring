"use client";
import Container from "@/components/Container";
import { motion } from "motion/react";
import presets from "@/data/presets";
import { useRef, useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function Home() {
  const [ballTravelDistance, setBallTravelDistance] = useState(0);
  const dottedLineRef = useRef();
  const windowSize = useWindowSize();

  const [hovered, setHovered] = useState("");

  const handleHoveredAnimation = (animationName) => {
    const hoveredAnimation = presets.find(
      (preset) => preset.name === animationName
    );
    setHovered(hoveredAnimation);
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
      <section className="py-8">
        <Container className="@container/Choose">
          <h1 className="font-sans font-semibold text-2xl tracking-tight @md/Choose:max-w-[30ch]">
            Finding the right spring animation is hard. Not anymore.
          </h1>
          <div className="grid pb-32 grid-cols-4 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12 gap-8 mt-8">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="col-span-4 flex flex-col gap-2"
                onPointerEnter={() => handleHoveredAnimation(preset.name)}
                onPointerLeave={() => setHovered("")}
              >
                <motion.div
                  className="bg-neutral-50 rounded-2xl flex items-center justify-center h-80 overflow-hidden relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="relative w-[65%] h-[1px] bg-[url('/dotted-line.svg')] bg-repeat"
                    ref={dottedLineRef}
                  >
                    <motion.div
                      key={
                        hovered.name === preset.name
                          ? `active-${preset.name}`
                          : `inactive-${preset.name}`
                      } // Force recreate element on hover in and out. This ensures Motion doesn't keep the last animated position in memory and resumes from there
                      className={`size-8 absolute top-1/2 -translate-[16px] ${
                        hovered.name === preset.name
                          ? "bg-secondary"
                          : "bg-transparent"
                      } rounded-sm`}
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
                      className="absolute bottom-0 left-0 p-6 right-12 w-full flex items-end justify-between"
                      initial={{ opacity: 0.5, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "tween",
                        ease: "easeOut",
                        duration: 0.1,
                      }}
                    >
                      <span className="font-sans text-sm font-medium text-primary/50">
                        {preset.name}
                      </span>
                      <div className="flex flex-col gap-1">
                        {preset.config.mass && (
                          <div className="flex gap-2">
                            <span className="font-sans text-sm font-medium text-primary/50">
                              M:
                            </span>
                            <span className="font-sans text-sm font-bold text-primary/50">
                              {preset.config.mass}
                            </span>
                          </div>
                        )}
                        {preset.config.stiffness && (
                          <div className="flex gap-2">
                            <span className="font-sans text-sm font-medium text-primary/50">
                              S:
                            </span>
                            <span className="font-sans text-sm font-bold text-primary/50">
                              {preset.config.stiffness}
                            </span>
                          </div>
                        )}
                        {preset.config.damping && (
                          <div className="flex gap-2">
                            <span className="font-sans text-sm font-medium text-primary/50">
                              D:
                            </span>
                            <span className="font-sans text-sm font-bold text-primary/50">
                              {preset.config.damping}
                            </span>
                          </div>
                        )}
                        {preset.config.bounce && (
                          <div className="flex gap-2">
                            <span className="font-sans text-sm font-medium text-primary/50">
                              B:
                            </span>
                            <span className="font-sans text-sm font-bold text-primary/50">
                              {preset.config.bounce}
                            </span>
                          </div>
                        )}
                        {preset.config.duration && (
                          <div className="flex gap-2">
                            <span className="font-sans text-sm font-medium text-primary/50">
                              D:
                            </span>
                            <span className="font-sans text-sm font-bold text-primary/50">
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
}
