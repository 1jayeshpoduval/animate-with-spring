"use client";
import React, { useEffect, useState } from "react";
import ContainerTool from "@/components/ContainerTool";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PresetsList from "@/components/PresetsList";
import PresetModal from "@/components/PresetModal";

const ChooseClient = () => {
  const [hovered, setHovered] = useState("");

  const [codeCopy, setCodeCopy] = useState(null);

  const [presets, setPresets] = useState([]);

  const [selectedPreset, setSelectedPreset] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [isPresetOpen, setIsPresetOpen] = useState(false);

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

  const handleHoveredAnimation = (presetName) => {
    const hoveredAnimation = presets.find(
      (preset) => preset.name === presetName,
    );
    setHovered(hoveredAnimation);
  };

  const handlePresetClick = (presetName) => {
    const clickedPreset = presets.find((preset) => preset.name === presetName);
    setSelectedPreset(clickedPreset);
    setIsPresetOpen(true);
  };

  // Copy transition code to clipboard
  const handleCodeCopy = async (preset, language) => {
    let code = "";
    if (preset.type === "physics" && language === "Motion") {
      code = `transition={{
              type: 'spring',
              mass: ${preset.config.mass},
              stiffness: ${preset.config.stiffness},
              damping: ${preset.config.damping},
           }}`;
    } else if (preset.type === "physics" && language === "SwiftUI") {
      code = `withAnimation(.interpolatingSpring(mass: ${preset.config.mass}, stiffness: ${preset.config.stiffness}, damping: ${preset.config.damping}))`;
    } else if (preset.type === "time" && language === "Motion") {
      code = `transition={{
              type: 'spring',
              bounce: ${preset.config.bounce},
              duration: ${preset.config.duration}, 
            }}`;
    } else {
      code = `withAnimation(.spring(bounce: ${preset.config.bounce}, duration: ${preset.config.duration}))`;
    }
    setCodeCopy(language);
    setTimeout(() => {
      setCodeCopy(null);
    }, 4000);
    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      console.error(error.message);
    }
    toast.custom((t) => (
      <div className="bg-secondary text-primary-foreground relative flex w-[360px] items-center justify-between rounded-[12px] p-3 text-sm shadow-[0_1px_1px_-0.5px_rgba(161,21,18,0.06),0_4px_4px_-2px_rgba(161,21,18,0.06),0_8px_8px_-4px_rgba(161,21,18,0.06),0_-1px_1px_-0.5px_rgba(161,21,18,0.06),0_-4px_4px_-2px_rgba(161,21,18,0.06),0_-8px_8px_-4px_rgba(161,21,18,0.06)]">
        <span className="font-sans">Code copied to clipboard</span>
        <Button
          variant="default"
          className="items-cente bg-primary-foreground text-primary hover:bg-foreground flex cursor-pointer justify-center rounded-[6px] px-2 py-1 font-sans font-medium select-none hover:text-white"
          onClick={() => toast.dismiss(t)}
        >
          Close
        </Button>
      </div>
    ));
  };

  return (
    <main>
      <section className="my-12 md:mt-28">
        <ContainerTool className="@container/Choose">
          <h1 className="font-heading text-3xl tracking-tight @md/Choose:max-w-[25ch]">
            Growing collection of finely tuned spring animations.
          </h1>
          <AnimatePresence mode="popLayout">
            {isLoading && !isPresetOpen ? (
              <motion.div
                className="flex h-[50vh] items-center justify-center lg:h-[75vh]"
                key="loading"
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                  },
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                }}
              >
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
                  <span className="text-primary/50">Loading presets...</span>
                </div>
              </motion.div>
            ) : (
              <PresetsList
                presets={presets}
                hovered={hovered}
                setHovered={setHovered}
                handleHoveredAnimation={handleHoveredAnimation}
                handlePresetClick={handlePresetClick}
                isPresetOpen={isPresetOpen}
              />
            )}
          </AnimatePresence>
        </ContainerTool>
        <PresetModal
          presets={presets}
          selectedPreset={selectedPreset}
          isPresetOpen={isPresetOpen}
          setIsPresetOpen={setIsPresetOpen}
          handleCodeCopy={handleCodeCopy}
          codeCopy={codeCopy}
        />
      </section>
    </main>
  );
};

export default ChooseClient;
