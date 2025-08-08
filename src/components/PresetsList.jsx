"use client";
import React, { useRef } from "react";
import { motion } from "motion/react";
import useBallX from "@/hooks/useBallX";

const PresetsList = ({
  presets,
  hovered,
  setHovered,
  handleHoveredAnimation,
  handlePresetClick,
  isPresetOpen,
}) => {
  const dottedLineRef = useRef(null);
  const { ballTravelDistance } = useBallX(dottedLineRef);

  const presetsAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.1,
        staggerChildren: 0.035,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const presetItemsAnimation = {
    hidden: { y: -20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="mt-8 grid grid-cols-4 gap-8 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12"
      variants={presetsAnimation}
      initial="hidden"
      animate="show"
    >
      {presets.map((preset) => (
        <motion.div
          className="col-span-4 cursor-pointer overflow-hidden rounded-2xl bg-transparent p-0 select-none"
          onPointerEnter={() => handleHoveredAnimation(preset.name)}
          onPointerLeave={() => setHovered("")}
          onClick={() => handlePresetClick(preset.name)}
          layoutId={preset.name}
          transition={{
            type: "spring",
            mass: 1,
            stiffness: 590,
            damping: 53,
          }}
        >
          <motion.div
            className="relative flex h-80 items-center justify-center rounded-2xl bg-neutral-50"
            variants={presetItemsAnimation}
            whileTap={{ scale: 0.98 }}
            layoutId={`${preset.name}-neutral-bg`}
            layout="preserve-aspect"
          >
            <motion.div
              className="animate-move relative h-[1px] w-[65%]"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-neutral-500), var(--color-neutral-500) 50%, transparent 50%, transparent 100%) 0 0 / 0.5rem 1px ",
              }}
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
                    hovered.name === preset.name && !isPresetOpen
                      ? ballTravelDistance
                      : 0,
                }} // Animate the ball to the width of the dotted line
                transition={
                  preset.type === "time"
                    ? {
                        type: "spring",
                        duration: preset.config?.duration,
                        bounce: preset.config?.bounce,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }
                    : {
                        type: "spring",
                        stiffness: preset.config?.stiffness,
                        damping: preset.config?.damping,
                        mass: preset.config?.mass,
                        repeat: Infinity,
                        repeatType: "mirror",
                      }
                }
              ></motion.div>
            </motion.div>
            <motion.div
              className="absolute right-0 bottom-0 left-0 flex h-12 items-end justify-between p-4 py-6 lg:p-8" // Giving it a height stops it from shifting around when hovered
              layoutId={`${preset.name}-deets`}
              layout="preserve-aspect"
            >
              <span className="text-primary/50 font-sans text-sm font-medium">
                {preset.name}
              </span>
              {hovered.name === preset.name && (
                <div className="flex flex-col">
                  {preset.config?.mass && (
                    <div className="flex gap-1">
                      <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                        M:
                      </span>
                      <span className="text-primary/50 font-sans text-sm font-bold">
                        {preset.config?.mass}
                      </span>
                    </div>
                  )}
                  {preset.config?.stiffness && (
                    <div className="flex gap-1">
                      <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                        S:
                      </span>
                      <span className="text-primary/50 font-sans text-sm font-bold">
                        {preset.config?.stiffness}
                      </span>
                    </div>
                  )}
                  {preset.config?.damping && (
                    <div className="flex gap-1">
                      <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                        D:
                      </span>
                      <span className="text-primary/50 font-sans text-sm font-bold">
                        {preset.config?.damping}
                      </span>
                    </div>
                  )}
                  {preset.config?.bounce && (
                    <div className="flex gap-1">
                      <span className="text-primary/50 font-sans text-sm font-medium">
                        B:
                      </span>
                      <span className="text-primary/50 font-sans text-sm font-bold">
                        {preset.config?.bounce}
                      </span>
                    </div>
                  )}
                  {preset.config?.duration && (
                    <div className="flex gap-1">
                      <span className="text-primary/50 font-sans text-sm font-medium">
                        D:
                      </span>
                      <span className="text-primary/50 font-sans text-sm font-bold">
                        {preset.config?.duration}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PresetsList;
