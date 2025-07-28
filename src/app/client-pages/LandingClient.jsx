"use client";
import ContainerLanding from "@/components/ContainerLanding";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBallX from "@/hooks/useBallX";
import presets from "@/data/landingPagePresets";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const LandingClient = () => {
  const dottedLineRef = useRef(null);

  const { ballTravelDistance } = useBallX(dottedLineRef);

  const [springPreset, setSpringPreset] = useState("");

  //GSAP SplitText
  useGSAP(() => {
    let split = SplitText.create("#head1", { type: "words" });
    let tl = gsap.timeline();
    tl.from(split.words, {
      duration: 0.4,
      y: 20,
      rotate: "5deg",
      autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
      stagger: 0.06,
      ease: "back.out",
    }).from(
      "#btn-hero",
      {
        scale: 0.65,
        autoAlpha: 0,
        duration: 0.3,
        rotate: "5deg",
        ease: "back.out",
      },
      "<0.5",
    );
  });

  const handlePresetClick = (presetName) => {
    const clickedPreset = presets.find((preset) => preset.name === presetName);

    if (clickedPreset) {
      console.log(clickedPreset.name);
      setSpringPreset(clickedPreset);
    }
  };

  const getTransition = (preset) => {
    if (!preset) return {};

    return {
      type: "spring",
      stiffness: preset.config?.stiffness,
      damping: preset.config?.damping,
      mass: preset.config?.mass,
      repeat: Infinity,
      repeatType: "mirror",
    };
  };

  return (
    <main>
      <section className="h-[100dvh] overflow-hidden lg:h-screen">
        <ContainerLanding className="flex h-[80%] flex-col items-center justify-center gap-6 md:gap-8">
          <h1
            id="head1"
            className="font-heading max-w-[15ch] text-center text-4xl leading-11 font-medium tracking-tighter md:max-w-[20ch] md:text-5xl md:leading-14"
          >
            Configure tasteful spring animations with ease
          </h1>
          <motion.div
            whileHover={{ scale: 1.03, rotate: "-2.5deg" }}
            whileTap={{ scale: 0.97, rotate: 0 }}
            transition={{
              type: "spring",
              mass: 1,
              damping: 27,
              stiffness: 600,
            }}
            id="btn-hero"
          >
            <Button
              variant="default"
              className="bg-secondary hover:shadow-2xl"
              asChild
            >
              <Link href="/tool/choose">Take me there</Link>
            </Button>
          </motion.div>
        </ContainerLanding>
        <div className="h-[20%] w-full">
          <div
            className="animate-move relative h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, var(--color-neutral-500), var(--color-neutral-500) 50%, transparent 50%, transparent 100%) 0 0 / 0.5rem 1px ",
            }}
            /*  ref={dottedLineRef} */
          ></div>
          <ContainerLanding className="relative flex h-full flex-col items-center justify-center">
            <div
              className="absolute top-0 mx-auto h-1 w-full md:w-[50%]"
              ref={dottedLineRef}
            >
              {" "}
              <motion.div
                className="bg-secondary size-8 -translate-[16px] rounded-full lg:size-10 lg:-translate-[20px]"
                key={springPreset.name}
                initial={{ x: 0 }}
                animate={{
                  x: springPreset ? ballTravelDistance : 0,
                }} // Animate the ball to the width of the dotted line
                transition={getTransition(springPreset)}
              ></motion.div>
            </div>

            <div className="absolute bottom-8 flex items-center gap-4">
              {presets.map((preset) => (
                <Button
                  key={preset.key}
                  variant="outline"
                  className={`${preset.name === springPreset.name ? "bg-primary border-none text-white" : ""}`}
                  onClick={() => handlePresetClick(preset.name)}
                >
                  {preset.name}
                </Button>
              ))}
              <Link
                className="hover:text-primary text-sm font-medium text-neutral-400 select-none hover:underline"
                href="/tool/choose"
              >
                and more
              </Link>
            </div>
          </ContainerLanding>
        </div>
      </section>
    </main>
  );
};

export default LandingClient;
