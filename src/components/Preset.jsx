import React from "react";
import { motion } from "motion/react";
import ContainerTool from "./ContainerTool";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";

const Preset = ({
  selectedPreset,
  isPresetOpen,
  setIsPresetOpen,
  dottedLineRef,
  ballTravelDistance,
  codeCopy,
  handleCodeCopy,
}) => {
  return (
    isPresetOpen && (
      <section
        className="bg-primary/15 fixed top-0 z-30 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
        onClick={() => setIsPresetOpen(false)}
      >
        <ContainerTool className="@container/Choose">
          <div className="mt-8 grid grid-cols-4 gap-0 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12">
            <div className="col-span-4 flex flex-col gap-2 select-none @lg/Choose:col-span-4 @4xl/Choose:col-span-5">
              <div className="relative flex h-[250px] items-center justify-center overflow-hidden rounded-t-2xl bg-neutral-50 lg:h-[400px] @lg/Choose:rounded-t-none @lg/Choose:rounded-l-2xl">
                <div
                  className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                  ref={dottedLineRef}
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
                </div>

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
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4 rounded-t-none rounded-tr-none rounded-b-2xl bg-white pb-8 @lg/Choose:col-span-4 @lg/Choose:rounded-tr-2xl @lg/Choose:rounded-bl-none @4xl/Choose:col-span-7">
              <div className="flex h-full flex-col">
                <div className="text-primary relative rounded-t-none rounded-b-2xl px-4 pt-6 pb-4 lg:px-8 lg:pt-8 lg:pb-4">
                  <span className="text-[1.05rem] font-semibold">Motion</span>
                  <Button
                    className="absolute top-4 right-4 size-8 !p-2 lg:top-6 lg:right-8 lg:block"
                    variant="secondary"
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked: Motion");
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
                  <div className="w-full px-8 font-mono text-sm break-words whitespace-pre-wrap lg:px-12">
                    {`transition={{ 
  type: 'spring', 
  mass: ${selectedPreset.config.mass}, 
  stiffness: ${selectedPreset.config.stiffness},
  damping: ${selectedPreset.config.damping},
}}`}
                  </div>
                ) : (
                  <div className="w-full px-8 font-mono text-sm break-words whitespace-pre-wrap lg:px-12">
                    {`transition={{ 
  type: 'spring', 
  bounce: ${selectedPreset.config.bounce}, 
  duration: ${selectedPreset.config.duration},
}}`}
                  </div>
                )}
              </div>
              <div className="flex h-full flex-col">
                <div className="text-primary relative px-4 pt-6 pb-4 lg:px-8 lg:pt-8 lg:pb-4">
                  <span className="text-[1.05rem] font-semibold">SwiftUI</span>
                  <Button
                    className="absolute top-4 right-4 size-8 !p-2 lg:top-6 lg:right-8 lg:block"
                    variant="secondary"
                    asChild
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Clicked: SwiftUI");
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
                  <div className="w-full px-8 font-mono text-sm break-words whitespace-pre-wrap lg:px-12">
                    {`withAnimation(.interpolatingSpring(mass: ${selectedPreset.config.mass}, stiffness: ${selectedPreset.config.stiffness}, damping: ${selectedPreset.config.damping}))`}
                  </div>
                ) : (
                  <div className="w-full px-8 font-mono text-sm break-words whitespace-pre-wrap lg:px-12">
                    {`withAnimation(.spring(bounce: ${selectedPreset.config.bounce}, duration: ${selectedPreset.config.duration}))`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ContainerTool>
      </section>
    )
  );
};

export default Preset;
