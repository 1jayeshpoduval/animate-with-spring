"use client";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import ContainerTool from "./ContainerTool";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import useBallX from "@/hooks/useBallX";
import { useMediaQuery } from "react-responsive";

const PresetModal = ({
  selectedPreset,
  isPresetOpen,
  setIsPresetOpen,
  codeCopy,
  handleCodeCopy,
}) => {
  const isTabletAndAbove = useMediaQuery({ query: "(min-width: 592px)" });

  const dottedLineRef = useRef(null);

  const currentDottedLineRef = isPresetOpen ? dottedLineRef : "";

  const { ballTravelDistance } = useBallX(currentDottedLineRef);

  return (
    <AnimatePresence mode="wait">
      {isPresetOpen && (
        <section className="fixed top-0 z-40 flex h-screen w-screen items-center justify-center">
          <motion.div
            className="bg-primary/15 fixed top-0 h-full w-full"
            initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
            animate={{ backdropFilter: "blur(10px)", opacity: 1 }}
            transition={{
              type: "spring",
              mass: 1,
              stiffness: 400,
              damping: 37,
            }}
            exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
            onClick={() => setIsPresetOpen(false)}
          ></motion.div>

          <ContainerTool className="@container/Choose">
            <motion.div
              className="grid grid-cols-4 gap-0 overflow-hidden rounded-3xl bg-white p-4 @md/Choose:grid-cols-8 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12"
              layoutId={selectedPreset.name}
              layout
              transition={{
                type: "spring",
                mass: 0.75,
                stiffness: 160,
                damping: 20,
              }}
            >
              <motion.div className="relative col-span-4 flex h-[250px] items-center justify-center overflow-hidden rounded-2xl bg-neutral-50 select-none @md/Choose:col-span-8 @lg/Choose:col-span-4 @lg/Choose:h-full @4xl/Choose:col-span-5">
                <motion.div
                  className="animate-move relative h-[1px] w-[65%]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-neutral-500), var(--color-neutral-500) 50%, transparent 50%, transparent 100%) 0 0 / 0.5rem 1px ",
                  }}
                  ref={currentDottedLineRef}
                >
                  <motion.div
                    key={
                      isPresetOpen
                        ? `preset-${selectedPreset.name}-open`
                        : `preset-${selectedPreset.name}-close`
                    }
                    className="bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-full"
                    initial={{ x: 0 }}
                    animate={{
                      x: ballTravelDistance,
                    }} // Animate the ball to the width of the dotted line
                    transition={
                      selectedPreset.type === "time"
                        ? {
                            type: "spring",
                            duration: selectedPreset.config?.duration,
                            bounce: selectedPreset.config?.bounce,
                            repeat: Infinity,
                            repeatType: "mirror",
                          }
                        : {
                            type: "spring",
                            stiffness: selectedPreset.config?.stiffness,
                            damping: selectedPreset.config?.damping,
                            mass: selectedPreset.config?.mass,
                            repeat: Infinity,
                            repeatType: "mirror",
                          }
                    }
                  ></motion.div>
                </motion.div>

                <motion.div
                  className="absolute right-12 bottom-0 left-0 flex w-full items-end justify-between p-4 py-6 lg:p-8"
                  initial={{ opacity: 0.5, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "tween",
                    ease: "easeOut",
                    duration: 0.1,
                  }}
                >
                  <span className="text-primary/50 font-sans text-sm font-medium">
                    {selectedPreset.name}
                  </span>
                  <div className="flex flex-col">
                    {selectedPreset.config?.mass && (
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          M:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {selectedPreset.config?.mass}
                        </span>
                      </div>
                    )}
                    {selectedPreset.config?.stiffness && (
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          S:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {selectedPreset.config?.stiffness}
                        </span>
                      </div>
                    )}
                    {selectedPreset.config?.damping && (
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          D:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {selectedPreset.config?.damping}
                        </span>
                      </div>
                    )}
                    {selectedPreset.config?.bounce && (
                      <div className="flex gap-1">
                        <span className="text-primary/50 font-sans text-sm font-medium">
                          B:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {selectedPreset.config?.bounce}
                        </span>
                      </div>
                    )}
                    {selectedPreset.config?.duration && (
                      <div className="flex gap-1">
                        <span className="text-primary/50 font-sans text-sm font-medium">
                          D:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {selectedPreset.config?.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="col-span-4 flex flex-col gap-4 pb-8 @md/Choose:col-span-8 @lg/Choose:col-span-4 @4xl/Choose:col-span-7"
                initial={{
                  opacity: 0,

                  x: isTabletAndAbove ? 50 : 0,
                  y: isTabletAndAbove ? 0 : 50,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{
                  opacity: 0,

                  x: isTabletAndAbove ? 50 : 0,
                  y: isTabletAndAbove ? 0 : 50,
                  transition: {
                    delay: 0,
                    duration: 0.1,
                  },
                }}
                transition={{ duration: 0.175, delay: 0.1 }}
              >
                <div className="flex h-full flex-col">
                  <div className="text-primary relative rounded-t-none rounded-b-2xl px-0 pt-8 pb-4 md:px-8 md:pt-4 md:pb-4">
                    <span className="text-[1.05rem] font-semibold">Motion</span>
                    <Button
                      className="absolute top-6 right-0 size-8 !p-2 md:top-2 md:right-2"
                      variant="secondary"
                      asChild
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCodeCopy(selectedPreset, "Motion");
                      }}
                    >
                      {codeCopy === "Motion" ? (
                        <Check
                          size={24}
                          strokeWidth={2.5}
                          className="text-primary/50 hover:text-primary"
                        />
                      ) : (
                        <Copy
                          size={24}
                          strokeWidth={2.5}
                          className="text-primary/50 hover:text-primary"
                        />
                      )}
                    </Button>
                  </div>
                  {selectedPreset.type === "physics" ? (
                    <div className="w-full px-4 font-mono text-sm break-words whitespace-pre-wrap md:px-12">
                      {`transition={{ 
  type: 'spring', 
  mass: ${selectedPreset.config.mass}, 
  stiffness: ${selectedPreset.config.stiffness},
  damping: ${selectedPreset.config.damping},
}}`}
                    </div>
                  ) : (
                    <div className="w-full px-4 font-mono text-sm break-words whitespace-pre-wrap md:px-12">
                      {`transition={{ 
  type: 'spring', 
  bounce: ${selectedPreset.config.bounce}, 
  duration: ${selectedPreset.config.duration},
}}`}
                    </div>
                  )}
                </div>
                <div className="flex h-full flex-col">
                  <div className="text-primary relative px-0 pt-8 pb-4 md:px-8 md:pt-4 md:pb-4">
                    <span className="text-[1.05rem] font-semibold">
                      SwiftUI
                    </span>
                    <Button
                      className="absolute top-6 right-0 size-8 !p-2 md:top-2 md:right-2"
                      variant="secondary"
                      asChild
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCodeCopy(selectedPreset, "SwiftUI");
                      }}
                    >
                      {codeCopy === "SwiftUI" ? (
                        <Check
                          size={24}
                          strokeWidth={2.5}
                          className="text-primary/50 hover:text-primary"
                        />
                      ) : (
                        <Copy
                          size={24}
                          strokeWidth={2.5}
                          className="text-primary/50 hover:text-primary"
                        />
                      )}
                    </Button>
                  </div>
                  {selectedPreset.type === "physics" ? (
                    <div className="w-full px-4 font-mono text-sm break-words whitespace-pre-wrap md:px-12">
                      {`withAnimation(.interpolatingSpring(mass: ${selectedPreset.config.mass}, stiffness: ${selectedPreset.config.stiffness}, damping: ${selectedPreset.config.damping}))`}
                    </div>
                  ) : (
                    <div className="w-full px-4 font-mono text-sm break-words whitespace-pre-wrap md:px-12">
                      {`withAnimation(.spring(bounce: ${selectedPreset.config.bounce}, duration: ${selectedPreset.config.duration}))`}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </ContainerTool>
        </section>
      )}
    </AnimatePresence>
  );
};

export default PresetModal;
