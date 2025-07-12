"use client";
import Container from "@/components/Container";
import { ArrowUpRight, Lightbulb, Play, Square } from "lucide-react";
import springEffects from "@/data/springEffects";
import { motion } from "motion/react";
import useBallX from "@/hooks/useBallX";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import resources from "@/data/resources";

const LearnClient = () => {
  const [effects, setEffects] = useState(springEffects);

  const { ballTravelDistance, dottedLineRef } = useBallX();

  const handleAnimationClick = (springEffect) => {
    setEffects((prevEffect) =>
      prevEffect.map((prev) =>
        prev.key === springEffect.key
          ? { ...prev, toggle: !prev.toggle }
          : prev,
      ),
    );
  };

  return (
    <main>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="flex flex-col gap-8">
            <h1 className="font-sans text-2xl font-semibold tracking-tight @md/Learn:max-w-[30ch]">
              What does mass, stiffness, and damping really mean?
            </h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Mass</span>
                <p className="max-w-[60ch]">
                  Imagine a ball. Mass is like the weight of that ball.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Stiffness</span>
                <p className="max-w-[50ch]">
                  Now imagine the ball is attached to a spring. Stiffness is how
                  strongly the spring tries to pull the ball back to where it
                  started.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Damping</span>
                <p className="max-w-[50ch]">
                  Damping is like friction. It decides how much bounce the
                  spring loses over time. Zero damping means the spring never
                  stops springing.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="text-secondary relative my-4 ml-4 max-w-[45ch] rounded-lg bg-[#FDEDED] py-4 pr-2 pl-6 font-medium md:my-8">
            <p>
              The spring motion{" "}
              <span className="font-semibold italic">always</span> depends on
              how mass, stiffness, and damping work{" "}
              <span className="font-semibold italic">together</span>. It’s the
              mix that decides whether an animation feels playful, snappy,
              smooth or heavy.
            </p>
            <div className="bg-secondary absolute -top-3 -left-3 rounded-full p-1">
              <Lightbulb color="white" size={20} />
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="mb-12 flex flex-col gap-8">
            <h2 className="font-sans text-xl font-semibold tracking-tight @md/Learn:max-w-[30ch]">
              What does different combinations feel like?
            </h2>
            <div className="grid grid-cols-4 gap-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-16">
              {/* Map over effects as it holds the springEffects */}
              {effects.map((effect) => (
                <div
                  className="col-span-4 flex flex-col gap-8 md:col-span-8 md:flex md:flex-row lg:col-span-12"
                  key={effect.key}
                >
                  <div className="flex w-full flex-col gap-2" key={effect.key}>
                    <span className="font-semibold">{effect.name}</span>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-4">
                        <span className="text-primary/50 w-[80px]">Mass</span>
                        <span className="text-primary/50 font-semibold">
                          {effect.massString}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-primary/50 w-[80px]">
                          Stiffness
                        </span>
                        <span className="text-primary/50 font-semibold">
                          {effect.stiffnessString}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-primary/50 w-[80px]">
                          Damping
                        </span>
                        <span className="text-primary/50 font-semibold">
                          {effect.dampingString}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-50">
                    <Button
                      className="absolute bottom-4 left-4 size-8 !p-2"
                      variant="secondary"
                      asChild
                      onClick={() => handleAnimationClick(effect)}
                    >
                      {effect.toggle ? (
                        <Square fill="black" size={20} />
                      ) : (
                        <Play fill="black" size={20} />
                      )}
                    </Button>
                    <div className="absolute right-4 bottom-4 flex flex-col">
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          M:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {effect.mass}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          S:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {effect.stiffness}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-primary/50 w-[18px] font-sans text-sm font-medium">
                          D:
                        </span>
                        <span className="text-primary/50 font-sans text-sm font-bold">
                          {effect.damping}
                        </span>
                      </div>
                    </div>
                    <div
                      className="relative h-[1px] w-[65%] bg-[url('/dotted-line.svg')] bg-repeat"
                      ref={dottedLineRef}
                    >
                      <motion.div
                        className="bg-secondary absolute top-1/2 size-8 -translate-[16px] rounded-full"
                        /* To force kill the animation */
                        key={
                          effect.toggle
                            ? `playing-${effect.key}`
                            : `killed-${effect.key}`
                        }
                        initial={{ x: 0 }}
                        animate={{ x: effect.toggle ? ballTravelDistance : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: `${effect.stiffness}`,
                          damping: `${effect.damping}`,
                          mass: `${effect.mass}`,
                          repeat: Infinity,
                          repeatType: "mirror",
                        }}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="py-4">
        <Container className="@container/Learn">
          <div className="mb-12 flex flex-col gap-8">
            <h2 className="font-sans text-xl font-semibold tracking-tight @md/Learn:max-w-[30ch]">
              Here are some awesome resources to learn more about spring
              animations.
            </h2>
            <ul className="flex flex-col gap-4">
              {resources.map((resource) => (
                <li
                  className="text-primary/50 hover:text-primary flex items-center gap-2 font-medium transition-colors hover:underline"
                  key={resource.url}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title}
                    <ArrowUpRight
                      size={20}
                      className="ml-1 inline align-text-top" /* Inline makes the icon wrap with the text */
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default LearnClient;
