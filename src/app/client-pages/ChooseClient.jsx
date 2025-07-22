"use client";
import React, { useEffect } from "react";
import ContainerTool from "@/components/ContainerTool";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import useBallX from "@/hooks/useBallX";

const ChooseClient = () => {
  const { ballTravelDistance, dottedLineRef } = useBallX();

  const [hovered, setHovered] = useState("");

  const [codeCopy, setCodeCopy] = useState(false);

  const [presets, setPresets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/presets")
      .then((res) => res.json())
      .then((data) => {
        setPresets(data.presets);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching presets", err);
        setIsLoading(false);
      });
  }, []);

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
    setCodeCopy(true);
    setTimeout(() => {
      setCodeCopy(false);
    }, 4000);
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error(error.message);
    }
    toast.custom((t) => (
      <div className="bg-secondary text-primary-foreground relative flex w-[360px] items-center justify-between rounded-[12px] p-3 text-sm shadow-[0_1px_1px_-0.5px_rgba(161,21,18,0.06),0_4px_4px_-2px_rgba(161,21,18,0.06),0_8px_8px_-4px_rgba(161,21,18,0.06),0_-1px_1px_-0.5px_rgba(161,21,18,0.06),0_-4px_4px_-2px_rgba(161,21,18,0.06),0_-8px_8px_-4px_rgba(161,21,18,0.06)]">
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

  return (
    <main>
      <section className="my-12 md:mt-28">
        <ContainerTool className="@container/Choose">
          <h1 className="font-sans text-2xl font-semibold tracking-tight @md/Choose:max-w-[25ch]">
            Growing collection of finely tuned spring animations.
          </h1>
          {isLoading ? (
            <div className="flex h-[80vh] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="bg-secondary size-4 rounded-full"
                  initial={{ x: 50 }}
                  animate={{ x: -50 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                    mass: 1,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                ></motion.div>
                <span className="text-primary/50 font-medium">
                  Loading presets...
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-4 gap-8 @lg/Choose:grid-cols-8 @4xl/Choose:grid-cols-12">
              {presets.map((preset) => (
                <div
                  key={preset.id}
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
                          hovered?.name === preset.name
                            ? "bg-secondary"
                            : "bg-transparent"
                        }`}
                        initial={{ x: 0 }}
                        animate={{
                          x:
                            hovered.name === preset.name
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
                    </div>
                    {hovered.name === preset.name && (
                      <>
                        <Button
                          className="absolute top-4 right-4 hidden size-8 !p-2 lg:block"
                          variant="secondary"
                          asChild
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCodeCopy(preset);
                          }}
                        >
                          {codeCopy ? (
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
            </div>
          )}
        </ContainerTool>
      </section>
    </main>
  );
};

export default ChooseClient;
