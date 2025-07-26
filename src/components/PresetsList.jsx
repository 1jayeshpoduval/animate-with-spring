"use client";
import React from "react";
import { motion } from "motion/react";

const PresetsList = ({
  presets,
  hovered,
  setHovered,
  handleHoveredAnimation,
  handlePresetClick,
  isPresetOpen,
  dottedLineRef,
  ballTravelDistance,
}) => {
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
        <div
          key={preset.id}
          className="col-span-4 flex cursor-pointer flex-col gap-2 select-none"
          onPointerEnter={() => handleHoveredAnimation(preset.name)}
          onPointerLeave={() => setHovered("")}
          onClick={() => handlePresetClick(preset.name)}
        >
          <motion.div
            className="relative flex h-80 items-center justify-center overflow-hidden rounded-2xl bg-neutral-50"
            variants={presetItemsAnimation}
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
              ref={dottedLineRef}
            >
              <motion.div
                key={
                  hovered.name === preset.name && !isPresetOpen
                    ? `active-${preset.name}`
                    : `inactive-${preset.name}`
                } // Force recreate element on hover in and out. This ensures Motion doesn't keep the last animated position in memory and resumes from there
                className={`absolute top-1/2 size-8 -translate-[16px] rounded-full ${
                  hovered?.name === preset.name
                    ? "bg-secondary"
                    : "bg-transparent"
                }`}
                initial={{ x: 0 }}
                animate={{
                  x: hovered.name === preset.name ? ballTravelDistance : 0,
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
            </div>
            {hovered.name === preset.name && (
              <>
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
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default PresetsList;
